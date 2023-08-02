import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  Project,
  QuoteKind,
  SourceFile,
  SyntaxKind,
  StructureKind,
  ExportDeclarationStructure,
  ImportDeclarationStructure,
} from 'ts-morph';

export function getSourceFile(tree: Tree, fileName: string): SourceFile {
  const sourceCode = tree.readText(fileName);
  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  });

  return project.createSourceFile('temp.ts', sourceCode);
}

export function addSourceExport(file: SourceFile, exportPath: string) {
  const exports = file.getExportDeclarations();

  const newExport: ExportDeclarationStructure = {
    moduleSpecifier: exportPath,
    kind: StructureKind.ExportDeclaration
  };

  if (exports.length > 0) {
    const sortedExports = exports.sort((lastExport, currentExport) => {
      return lastExport.getChildIndex() - currentExport.getChildIndex(); 
    });

    const lastExport = sortedExports[sortedExports.length - 1];

    file.insertExportDeclaration(lastExport.getChildIndex() + 1, newExport);
  } else {
    file.addExportDeclaration(newExport);
  }

  return file;
}

export function addSourceImport(
  file: SourceFile,
  importPath: string,
  importName: string,
  newLine: boolean = false,
): SourceFile {
  const imports = file.getImportDeclarations();
  const foundImportDeclaration = imports.find((declaration) => {
    return declaration.getModuleSpecifierValue() == importPath
  });

  if (!foundImportDeclaration) {
    const newImport: ImportDeclarationStructure = {
      namedImports: [importName],
      moduleSpecifier: importPath,
      kind: StructureKind.ImportDeclaration
    };

    if (imports.length > 0) {
      file.insertImportDeclaration(imports.length, newImport);
    } else {
      file.addImportDeclaration(newImport);
    }
  } else {
    const addedImport = foundImportDeclaration.addNamedImport(importName);
    if (newLine) {
      addedImport.replaceWithText((writer) => {
        writer.newLine().writeLine(addedImport.getText());
      });
    }
  }

  return file;
}

export function addArrayElementByVariableName(
  file: SourceFile,
  variableName: string,
  elementName: string
): SourceFile {
  const variableDeclaration = file.getVariableDeclaration(variableName);
  if (!variableDeclaration) {
    throw new SchematicsException(`The array ${variableName} could not be found to insert the value ${elementName}.`);
  }

  const arrayInitializer = variableDeclaration.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  const elements = arrayInitializer.getElements();
  const lastElement = elements[elements.length - 1];

  lastElement.replaceWithText(lastElement.getText() + ',\n' + elementName);

  return file;
}

export function addChainedCallExpression(
  file: SourceFile,
  variableName: string,
  newConcatSchema: string
): SourceFile {
  const variableDeclaration = file.getVariableDeclarationOrThrow(variableName);
  const initializer = variableDeclaration.getInitializerIfKindOrThrow(SyntaxKind.CallExpression);

  initializer.replaceWithText(initializer.getText() + `\n  .${newConcatSchema}`);

  return file;
}

export function addPropertyInReturnExpression(
  file: SourceFile,
  className: string,
  methodName: string,
  propertyName: string,
  propertyValue: string,
): SourceFile {
  const classDeclaration = file.getClass(className);
  if (!classDeclaration) {
    throw new SchematicsException(`The class ${className} doesnt exist.`);
  }

  const methodDeclaration = classDeclaration.getMethod(methodName);
  if (!methodDeclaration) {
    throw new SchematicsException(`The method ${methodName} doesnt exist in the class ${className}.`);
  }

  const bodyDeclaration = methodDeclaration.getBody();
  const returnStatement = bodyDeclaration.getFirstChildByKind(SyntaxKind.ReturnStatement);
  if (!returnStatement) {
    throw new SchematicsException(`The method ${methodName} doesnt seen to have an return statement.`);
  }

  const objectDeclaration = returnStatement.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression);
  if (!objectDeclaration) {
    throw new SchematicsException(`The method ${methodName} doesnt seen to have an object as return type.`);
  }

  objectDeclaration.addPropertyAssignment({
    name: propertyName,
    initializer: propertyValue,
  });
  
  return file;
}

export function formatTypescript(file: SourceFile) {
  file.formatText({
    tabSize: 2,
    indentSize: 2,
    convertTabsToSpaces: true,
    trimTrailingWhitespace: true,
  });
}