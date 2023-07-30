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

import { DomainOptions } from './domain.schema';

import {
  addNestModuleOptionProperty,
  addSourceExport,
  addSourceImport,
  ensureProjectRoot,
  ensureProjectStructure,
  formatTypescript,
  getSourceFile,
  ModuleOptionProperty
} from 'src/core';

export function main(factoryOptions: DomainOptions): Rule {
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

function validate(options: DomainOptions): Rule {
  return (tree: Tree) => {
    if (!options.name)
      throw new OptionIsNotDefinedException('name');

    return tree;
  }
}

function generate(options: DomainOptions): Rule {
  const source = url('./files' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: strings.dasherize(options.name),
  }

  return mergeWith((context: SchematicContext) => apply(source, [
    template(renderOptions),
    move('src/domain/business'),
  ])(context));
}

function configure(options: DomainOptions): Rule {
  return (tree: Tree) => {
    const sliceName = strings.dasherize(options.name);
    const modulePath = `${sliceName}.module`;
    const moduleName = strings.classify(options.name) + 'Module';

    const slicesIndex = 'src/domain/business/slices/index.ts';
    const modulesIndex = 'src/domain/business/modules/index.ts';
    const businessModule = 'src/domain/business/modules/business-domain.module.ts';

    const slicesIndexFile = getSourceFile(tree, slicesIndex);
    const modulesIndexFile = getSourceFile(tree, modulesIndex);
    const businessModuleFile = getSourceFile(tree, businessModule);

    addSourceExport(slicesIndexFile, `./${sliceName}`);
    addSourceExport(modulesIndexFile, `./${modulePath}`);
    addSourceImport(businessModuleFile, `./${modulePath}`, moduleName);

    addNestModuleOptionProperty(
      businessModuleFile, 
      'BusinessDomainModule', 
      moduleName, 
      ModuleOptionProperty.IMPORT,
    );
    
    addNestModuleOptionProperty(
      businessModuleFile, 
      'BusinessDomainModule', 
      moduleName, 
      ModuleOptionProperty.EXPORT,
    );

    formatTypescript(businessModuleFile);

    tree.overwrite(slicesIndex, slicesIndexFile.getFullText());
    tree.overwrite(modulesIndex, modulesIndexFile.getFullText());
    tree.overwrite(businessModule, businessModuleFile.getFullText());

    return tree;
  };
}
