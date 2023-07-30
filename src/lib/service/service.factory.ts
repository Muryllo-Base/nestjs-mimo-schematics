import { Path, strings } from '@angular-devkit/core';

import {
  Tree,
  Rule,
  SchematicContext,
  OptionIsNotDefinedException,
  SchematicsException,
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

import { SeederOptions } from './service.schema';

import {
  ensureProjectRoot,
  ensureProjectStructure,
  addSourceExport,
  addSourceImport,
  addNestModuleOptionProperty,
  getSourceFile,
  ModuleOptionProperty,
  formatTypescript,
} from 'src/core';

export function main(factoryOptions: SeederOptions): Rule {
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

function validate(options: SeederOptions): Rule {
  return (tree: Tree) => {
    if (!options.name)
      throw new OptionIsNotDefinedException('name');
    if (!options.serviceType)
      throw new OptionIsNotDefinedException('serviceType');

    if (options.serviceType == 'domain') {
      throw new SchematicsException('Sorry! The Domain Service scaffold/schematic is not available yet.');
    }

    return tree;
  }
}

function generate(options: SeederOptions): Rule {
  const commonSource = url('./files/common' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: strings.dasherize(options.name),
  }

  return mergeWith((context: SchematicContext) => apply(commonSource, [
    template(renderOptions),
    move('src/common/services'),
  ])(context));
}

function configure(options: SeederOptions): Rule {
  return (tree: Tree) => {
    const moduleName = 'ServicesModule';
    const modulePath = 'src/common/modules/services.module.ts';
    const indexPath = 'src/common/services/index.ts';
    const importPath = 'src/common/services';
    const importName = `${strings.classify(options.name)}Service`;
    const exportPath = `./${strings.dasherize(options.name)}.service`;

    const moduleFile = getSourceFile(tree, modulePath);
    const indexFile = getSourceFile(tree, indexPath);

    addSourceExport(indexFile, exportPath);
    addSourceImport(moduleFile, importPath, importName);
    addNestModuleOptionProperty(
      moduleFile,
      moduleName,
      importName,
      ModuleOptionProperty.PROVIDER
    );
    addNestModuleOptionProperty(
      moduleFile,
      moduleName,
      importName,
      ModuleOptionProperty.EXPORT
    );

    formatTypescript(moduleFile);

    tree.overwrite(modulePath, moduleFile.getFullText());
    tree.overwrite(indexPath, indexFile.getFullText());

    return tree;
  };
}
