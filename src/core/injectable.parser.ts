import { Scope, SourceFile } from 'ts-morph';

export function addExplicitInject(
  file: SourceFile, 
  className: string, 
  injectionKey: string, 
  injectionProperty: string,
  injectionType: string,
  injectionAccessModifier: Scope = Scope.Public,
) {
  const classDeclaration = file.getClassOrThrow(className);
  const constructor = classDeclaration.getConstructors()[0] ?? classDeclaration.addConstructor();

  const lastParameter = constructor.addParameter({
    name: injectionProperty,
    type: injectionType,
    scope: injectionAccessModifier,
    isReadonly: true,
    trailingTrivia: ','
  });

  lastParameter.replaceWithText('\n' + lastParameter.getText());
  lastParameter.addDecorator({
    name: 'Inject',
    arguments: [injectionKey],
    trailingTrivia: (writer) => writer.newLine().space(3),
  });

  return file;
}

export function addImplicitInject(
  file: SourceFile, 
  className: string, 
  injectionProperty: string,
  injectionType: string,
  injectionAccessModifier: Scope = Scope.Public,
) {
  const classDeclaration = file.getClassOrThrow(className);
  const constructor = classDeclaration.getConstructors()[0] ?? classDeclaration.addConstructor();

  constructor.addParameter({
    name: injectionProperty,
    type: injectionType,
    scope: injectionAccessModifier,
    isReadonly: true,
    trailingTrivia: ','
  });

  return file;
}
