module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "rules": {
        "comma-dangle": ["error", "always-multiline"],
        "func-names": ["error", "never"],
        "no-underscore-dangle": ["error", { "allow": ["_id", "_httpMessage"] }],
        "max-len": ["error", { "code": 300, "tabWidth": 4, "ignoreUrls": true, "ignoreTemplateLiterals": true, "ignoreRegExpLiterals": true }],
        "no-multi-assign": 0,
        "import/no-dynamic-require": 0,
        "no-undef": 0, //this show error on dynamic function which are defined at run time
        "no-param-reassign": 0, //showing error for abc=abc
        "consistent-return": 0,
        "no-plusplus": 0, //as we have to use ++ and -- so we are avoiding this
        "no-unused-vars": 0, //this shows error on variable which are defined at runtime
        "no-shadow": 0, //causing problem when there is a multiple callback in the same function
        "no-mixed-operators": 0, // its forbade the use of && and || together which may effect the logic
        "no-prototype-builtins":0,
        "array-callback-return":0, //it forbades the use of filter map
        "indent":[2,4],//It just give four spaces instead of two.I have customize it for proper indentation
        "newline-per-chained-call":0,
        "class-methods-use-this":0,

    },
    "plugins": [
        "import"
    ]
};

/**
 * max-len
 * error:line exceeds the limts 150
 * avoidedReason:we extending the max-len =300 beacuse as we have taken meaningfull name which may be long and then checking the condition,it can be long
 */
/**
 * no-prototype-builtins
 * error:Do not access Object.prototype method 'hasOwnProperty' from target object  no-prototype-builtins
 * avoided reason:showing error because we have used built-in function with objects that are defined dynamically during runtime
 */