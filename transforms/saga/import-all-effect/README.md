This codemod makes sure `all` effect is imported in your sagas.

Can be used this way:
```
git grep -l "yield all"| xargs jscodeshift -t <path_to_this_codemod>
```
