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

import { SeederOptions } from './seeder.schema';

import {
  ensureProjectRoot,
  ensureProjectStructure,
  getTimestamp
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
    if (!options.tableName)
      throw new OptionIsNotDefinedException('tableName');

    return tree;
  }
}

function generate(options: SeederOptions): Rule {
  const source = url('./files' as Path);

  const renderOptions = {
    ...options,
    ...strings,
    fileName: `${getTimestamp()}.${strings.dasherize(options.name)}`,
  }

  return mergeWith((context: SchematicContext) => apply(source, [
    template(renderOptions),
    move('src/database/seeders'),
  ])(context));
}

function configure(_options: SeederOptions): Rule {
  return (tree: Tree) => {
    // Nothing to do here.
    return tree;
  };
}
