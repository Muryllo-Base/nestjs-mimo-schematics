import { SchematicsException } from '@angular-devkit/schematics';
import { Node, PropertyAssignment, SourceFile } from 'ts-morph';

export enum ModuleOptionProperty {
  IMPORT = 'imports',
  PROVIDER = 'providers',
  CONTROLLER = 'controllers',
  EXPORT = 'exports',
}

function insertValueInModuleProperty(
  moduleName: string, 
  classImportName: string,
  optionProperty: PropertyAssignment, 
) {
  const optionArray = optionProperty.getInitializer();

  if (!optionArray || !Node.isArrayLiteralExpression(optionArray)) {
    throw new SchematicsException(`You must have a valid ${moduleName} class annotated with @Module to use this command.`);
  }

  optionArray.addElement(classImportName);
}

export function addNestModuleOptionProperty(
  file: SourceFile,
  moduleName: string,
  propertyValue: string,
  property: ModuleOptionProperty
) {

  const foundModule = file.getClass(moduleName);
  if (!Node.isClassDeclaration(foundModule)) {
    throw new SchematicsException(`You must have a valid ${moduleName} class annotated with @Module to use this command.`);
  }

  const foundDecorator = foundModule.getDecorator('Module');
  if (!Node.isDecorator(foundDecorator)) {
    throw new SchematicsException(`You must have a valid ${moduleName} class annotated with @Module to use this command.`);
  }

  const foundModuleOptions = foundDecorator.getArguments()[0];
  if (!Node.isObjectLiteralExpression(foundModuleOptions)) {
    throw new SchematicsException(`You must have a valid ${moduleName} class annotated with @Module to use this command.`);
  }

  const optionProperty = foundModuleOptions.getProperty(property.toString());

  if (!optionProperty) {
    const createdOptionProperty = foundModuleOptions.addPropertyAssignment({
      name: property.toString(),
      initializer: '[]'
    });

    insertValueInModuleProperty(
      moduleName, 
      propertyValue, 
      createdOptionProperty
    );
  } else {
    if (!Node.isPropertyAssignment(optionProperty)) {
      throw new SchematicsException(`You must have a valid ${moduleName} class annotated with @Module to use this command.`);
    }
    
    insertValueInModuleProperty(
      moduleName, 
      propertyValue, 
      optionProperty
    );
  }

  return file;
}
