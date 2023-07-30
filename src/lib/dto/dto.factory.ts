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

import { DtoOptions } from './dto.schema';
import {
  addSourceExport,
  ensureProjectRoot,
  ensureProjectStructure,
  getSourceFile
} from 'src/core';

export function main(factoryOptions: DtoOptions): Rule {
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

function validate(options: DtoOptions): Rule {
  return (tree: Tree) => {
    if (!options.name)
      throw new OptionIsNotDefinedException('name');

    return tree;
  }
}

function generate(options: DtoOptions): Rule {
  const source = url('./files' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: strings.dasherize(options.name),
  }

  return mergeWith((context: SchematicContext) => apply(source, [
    template(renderOptions),
    move(`src/common/dto/${options.dtoType}`),
  ])(context));
}

function configure(options: DtoOptions): Rule {
  return (tree: Tree) => {
    const indexPath = `src/common/dto/${options.dtoType}/index.ts`;
    const dtoName = strings.dasherize(options.name);
    const exportPath = `./${dtoName}-${options.dtoType}.dto`;
    const indexFile = getSourceFile(tree, indexPath);

    addSourceExport(indexFile, exportPath);

    tree.overwrite(indexPath, indexFile.getFullText());

    return tree;
  };
}
