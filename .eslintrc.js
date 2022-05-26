module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "jest": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:import/recommended",
        "prettier/react",
        "plugin:prettier/recommended"
    ],
    "rules": {
        "import/prefer-default-export": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-param-reassign": "off",
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
        "prettier/prettier": ["error", { "singleQuote": true, "parser": "flow" }],
        "react/prop-types": 0,
        "jsx-a11y/alt-text": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/jsx-props-no-spreading": "off",
        "jsx-quotes": ["error", "prefer-single"],
        "quotes": [2, "single", { "avoidEscape": true }],
        "react/no-unescaped-entities": "off",
        "react/button-has-type": "off",
        "no-debugger": "warn"
    },
    "settings": {
        "node": {
            "paths": ["src"]
        }
    },
    "parserOptions": {
        "ecmaVersion": 2020
    }
}