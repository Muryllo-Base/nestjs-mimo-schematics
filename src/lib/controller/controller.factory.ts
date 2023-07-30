import { Path, strings } from '@angular-devkit/core';

import {
  Tree,
  Rule,
  SchematicContext,
  OptionIsNotDefinedException,
} from '@angular-devkit/schematics';

import {
  url,
  move,
  apply,
  chain,
  template,
  mergeWith,
  branchAndMerge,
} from '@angular-devkit/schematics';

import { ControllerOptions } from './controller.schema';

import {
  addSourceExport,
  addNestModuleOptionProperty,
  ensureProjectRoot,
  ModuleOptionProperty,
  addSourceImport,
  getSourceFile,
  ensureProjectStructure,
  formatTypescript,
} from 'src/core';

export function main(factoryOptions: ControllerOptions): Rule {
  const options = Object.assign({}, factoryOptions);

  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        ensureProjectRoot(),
        ensureProjectStructure(),
        validate(options),
        generate(options),
        configure(options),
      ]),
    )(tree, context);
  };
}

function validate(options: ControllerOptions): Rule {
  return (tree: Tree) => {
    if (!options.name)
      throw new OptionIsNotDefinedException('name');

    return tree;
  }
}

function generate(options: ControllerOptions): Rule {
  const source = url('./files' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: strings.dasherize(options.name),
  }

  return mergeWith((context: SchematicContext) => apply(source, [
    template(renderOptions),
    move('src/api/controllers'),
  ])(context));
}

function configure(options: ControllerOptions): Rule {
  return (tree: Tree) => {
    const modulePath = 'src/api/modules/api.module.ts';
    const moduleName = 'ApiModule';
    const importPath = 'src/api/controllers';
    const importName = strings.classify(`${options.name}Controller`);

    const indexPath = 'src/api/controllers/index.ts';
    const controllerName = strings.dasherize(options.name);
    const exportPath = `./${controllerName}.controller`;

    const moduleFile = getSourceFile(tree, modulePath);
    const indexFile = getSourceFile(tree, indexPath);

    addSourceExport(indexFile, exportPath);
    addSourceImport(moduleFile, importPath, importName);
    addNestModuleOptionProperty(
      moduleFile,
      moduleName,
      importName,
      ModuleOptionProperty.CONTROLLER
    );

    formatTypescript(moduleFile);

    tree.overwrite(modulePath, moduleFile.getFullText());
    tree.overwrite(indexPath, indexFile.getFullText());

    return tree;
  };
}
