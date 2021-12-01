module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "globals": {
        "__dirname": true,
        "converse": true,
        "exports": true,
        "module": true,
        "process": true,
        "require": true,
    },
    "rules": {
        "prefer-const": "error",
    }
};
