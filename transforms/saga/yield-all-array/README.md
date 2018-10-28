Since redux-saga v0.15 syntax `yield [...effects]` is considered deprecated.
Attempts to use it spam warnings in console.
This codemod wraps array with `all` effect producing `yield all([...effect])`.

This still requires `all` effect [to be imported](https://github.com/Beaglefoot/codemods-collection/tree/master/transforms/saga/import-all-effect).
