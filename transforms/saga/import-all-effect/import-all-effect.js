module.exports = (file, api) => {
  const j = api.jscodeshift;
  const importSpecifierToInsert = j.importSpecifier(j.identifier('all'));
  const effectsFileName = 'redux-saga/effects';

  let findResult = j(file.source)
    .find(j.ImportSpecifier)
    .filter(
      p =>
        p.parentPath.node.type === 'ImportDeclaration' &&
        p.parentPath.node.source.value === effectsFileName
    );

  const isAlreadyImported = findResult.some(p =>
    p.parentPath.node.specifiers.some(
      specifier => specifier.imported.name === 'all'
    )
  );

  if (isAlreadyImported) return file.source;

  findResult = findResult.at(0);

  // If there is no existing saga effects import
  if (findResult.size() === 0) {
    return j(file.source)
      .find(j.Program)
      .replaceWith(p =>
        j.program([
          j.importDeclaration(
            [j.importSpecifier(j.identifier('all'))],
            j.literal(effectsFileName)
          ),
          ...p.node.body
        ])
      )
      .toSource();
  }

  return findResult.insertBefore(importSpecifierToInsert).toSource();
};
