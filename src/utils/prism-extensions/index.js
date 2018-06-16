import Prism from 'prismjs/components/prism-core';
import loadComponents from 'prismjs/components/index.js';

document.removeEventListener('DOMContentLoaded', Prism.highlightAll);

loadComponents([
	'bash', 'c', 'clike', 'csharp', 'cpp', 'css', 'diff', 'docker', 'go', 'graphql', 'haml', 'handlebars', 'http', 'java', 'javascript', 'json', 'latex', 'less', 'makefile', 'markdown', 'markup', 'php', 'pug', 'python', 'r', 'jsx', 'tsx', 'ruby', 'sass', 'scss', 'stylus', 'swift', 'twig', 'typescript', 'vim', 'wasm', 'yaml'
]);

Prism.loadLang = Prism.loadLanguage = (lang) => {
	loadComponents([lang]);
};

Prism.languages.insertBefore('javascript', 'function', { 'keyword console builtin': /console/ });

const builtin_keywords = ['process', 'Promise'];

Prism.languages.insertBefore('javascript', 'constant', {
	'keyword builtin': {
		pattern: new RegExp(`\\b(${builtin_keywords.join('|')})\\b`)
	}
});

const builtin_functions = ['require', 'setTimeout', 'setInterval'];

Prism.languages.insertBefore('javascript', 'function', {
	'function builtin': {
		pattern: new RegExp(`\\b(${builtin_functions.join('|')})\\b`)
	}
});

const prototypes = [
	...Object.getOwnPropertyNames(Array.prototype),
	...Object.getOwnPropertyNames(Object.prototype),
	...Object.getOwnPropertyNames(String.prototype),
	...Object.getOwnPropertyNames(Number.prototype),
	...Object.getOwnPropertyNames(Symbol.prototype),
	...Object.getOwnPropertyNames(Function.prototype),
	...Object.getOwnPropertyNames(Promise.prototype),
	...Object.getOwnPropertyNames(console),
	'exec', 'catch', 'finally', 'static', 'super', 'get', 'set', 'yield', 'super', 'as', 'in', 'with'
];

Prism.languages.insertBefore('javascript', 'class-name', {
	'function prototype': {
		pattern: new RegExp(`(\\.)\\b(${prototypes.join('|')})\\b`),
		lookbehind: true
	}
});

export default Prism;
