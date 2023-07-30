import chalk from 'chalk';
import { join } from 'path';
import { existsSync } from 'fs';
import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';

export function ensureProjectRoot(): Rule {
  return (tree: Tree) => {
    const cwd = process.cwd();
    const isRootPath = existsSync(join(cwd, 'package.json'));

    if (!isRootPath) {
      throw new SchematicsException('The command should be run from project root');
    }

    return tree;
  }
}

export function ensureProjectStructure(): Rule {
  return (tree: Tree) => {
    const paths = [
      'src',
      'src/api',
      'src/common',
      'src/domain',
      'src/database',
      'nest-cli.json',
      'package.json',
      'tsconfig.json'
    ];

    const cwd = process.cwd();
    const isValidProject = paths
      .map((path) => existsSync(join(cwd, path)))
      .every((exists) => exists == true);
 
    if (!isValidProject) {
      throw new SchematicsException('You are not inside a valid NestJS project with Onion Architecture.');
    }

    console.log(chalk.green('[+] Preparing to generate scaffolds...'));
    console.log(chalk.yellow('[!] Please ensure that the imports, exports, and dependency injections have been correctly set up.\n'));

    return tree;
  }
}
