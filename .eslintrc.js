module.exports = {
	"root": true,
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"parser": "babel-eslint",
		"ecmaVersion": 6,
		"sourceType": "module",
	},
	"env": {
		"es6": true,
		"browser": true,
		"node": true
	},
	"extends": "plugin:vue/essential",
	"plugins": [
		"vue",
	],
	"rules": {
		"no-multiple-empty-lines": [2, { max: 1, maxEOF: 1 }],
		"spaced-comment": [2, "always"],
		"semi": [2, "always"],
		"eol-last": 2,
		"no-undef": 2,
		"no-unused-expressions": 2,
		"comma-spacing": [2, { "before": false, "after": true }],
		"array-bracket-spacing": [2, "never"],
		"prefer-arrow-callback": ["error", { "allowNamedFunctions": false }],
		"padded-blocks": ["error", { "blocks": "never" }],
		"space-infix-ops": 2,
		"object-curly-spacing": [2, "always", { "arraysInObjects": true, "objectsInObjects": true }],
		"key-spacing": ["error", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
		"indent": [2, "tab", { "SwitchCase": 1, "MemberExpression": 0 }],
		"linebreak-style": [2, "unix"],
		"quotes": [2, "single"],
		"semi": [2, "always"],
		"capitalized-comments": 0,
		"no-trailing-spaces": 0,
		"no-empty-pattern": 0,
		"comma-dangle": 0,
		"func-name-matching": 0,
		"func-names": 0,
		"spaced-comment": 0,
		"no-use-before-define": 0,
		"no-console": 0,
		"no-useless-escape": 0,
		"no-var": 2,
		"vue/html-quotes": [2, "single"],
		"vue/script-indent": [2, "tab", { "baseIndent": 1 }],
		"vue/v-bind-style": 2,
		"vue/v-on-style": 2
	},
	"overrides": {
		"files": "**/*.vue",
		"rules": {
			"indent": "off"
		}
	}
}
