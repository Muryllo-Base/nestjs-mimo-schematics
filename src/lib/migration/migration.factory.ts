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

import { MigrationOptions } from './migration.schema';

import {
  ensureProjectRoot,
  ensureProjectStructure,
  getTimestamp
} from 'src/core';

export function main(factoryOptions: MigrationOptions): Rule {
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

function validate(options: MigrationOptions): Rule {
  return (tree: Tree) => {
    if (!options.name)
      throw new OptionIsNotDefinedException('name');
    if (!options.tableName)
      throw new OptionIsNotDefinedException('tableName');

    return tree;
  }
}

function generate(options: MigrationOptions): Rule {
  const source = url('./files' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: `${getTimestamp()}.${strings.dasherize(options.name)}`,
  }

  return mergeWith((context: SchematicContext) => apply(source, [
    template(renderOptions),
    move('src/database/migrations'),
  ])(context));
}

function configure(_options: MigrationOptions): Rule {
  return (tree: Tree) => {
    // Nothing to do here.
    return tree;
  };
}
