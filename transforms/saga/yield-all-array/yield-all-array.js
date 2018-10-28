module.exports = (file, api) => {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ArrayExpression)
    .filter(p => p.parentPath.node.type === 'YieldExpression')
    .replaceWith(p => j.callExpression(j.identifier('all'), [p.node]))
    .toSource();
};
