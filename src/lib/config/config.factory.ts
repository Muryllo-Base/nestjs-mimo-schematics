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

import { ConfigOptions } from './config.schema';

import {
  addArrayElementByVariableName,
  addChainedCallExpression,
  addExplicitInject,
  addSourceExport,
  addSourceImport,
  ensureProjectRoot,
  ensureProjectStructure,
  formatTypescript,
  getSourceFile
} from 'src/core';

export function main(factoryOptions: ConfigOptions): Rule {
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

function validate(options: ConfigOptions): Rule {
  return (tree: Tree) => {
    if (!options.name)
      throw new OptionIsNotDefinedException('name');

    return tree;
  }
}

function generate(options: ConfigOptions): Rule {
  const sliceSource = url('./files/slice' as Path);
  const schemaSource = url('./files/schema' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: strings.dasherize(options.name),
    uppercase: (text: string) => text.toUpperCase()
  }

  return chain([
    mergeWith((context: SchematicContext) => apply(sliceSource, [
      template(renderOptions),
      move(`src/domain/config/slices`),
    ])(context)),
    mergeWith((context: SchematicContext) => apply(schemaSource, [
      template(renderOptions),
      move(`src/domain/config/schemas`),
    ])(context)),
  ]);
}

function configure(options: ConfigOptions): Rule {
  return (tree: Tree) => {
    const configName = strings.dasherize(options.name);
    const configIdentifier = strings.classify(options.name);
    const configProperty = strings.camelize(options.name);
    const configKey = `${configIdentifier}Config.KEY`;
    const configService = 'ConfigurationDomainService';
    const importPath = 'src/domain/config/slices';
    const slicesIndexPath = 'src/domain/config/slices/index.ts';
    const schemasIndexPath = 'src/domain/config/schemas/index.ts';
    const domainServicePath = 'src/domain/config/services/configuration-domain.service.ts';
    const slicePath = `./${configName}.config`;
    const schemaPath = `./${configName}.schema`;

    const slicesIndexFile = getSourceFile(tree, slicesIndexPath);
    const schemasIndexFile = getSourceFile(tree, schemasIndexPath);
    const domainServiceFile = getSourceFile(tree, domainServicePath);

    addSourceImport(domainServiceFile, importPath, `${configIdentifier}Config`, true);
    addSourceImport(domainServiceFile, importPath, `${configIdentifier}ConfigType`, true);
    addSourceImport(slicesIndexFile, slicePath, `${configIdentifier}Config`);
    addSourceImport(schemasIndexFile, schemaPath, `${configIdentifier}Schema`);
    addSourceExport(slicesIndexFile, slicePath);
    addSourceExport(schemasIndexFile, schemaPath);
    addArrayElementByVariableName(slicesIndexFile, 'ConfigSlices', `${configIdentifier}Config`);
    addChainedCallExpression(schemasIndexFile, 'ConfigSchema', `concat(${configIdentifier}Schema)`);
    addExplicitInject(domainServiceFile, configService, configKey, configProperty, `${configIdentifier}ConfigType`);

    formatTypescript(slicesIndexFile);
    formatTypescript(schemasIndexFile);
    formatTypescript(domainServiceFile);

    tree.overwrite(slicesIndexPath, slicesIndexFile.getFullText());
    tree.overwrite(schemasIndexPath, schemasIndexFile.getFullText());
    tree.overwrite(domainServicePath, domainServiceFile.getFullText());

    return tree;
  };
}
