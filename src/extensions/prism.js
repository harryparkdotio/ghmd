import Prism from 'prismjs/components/prism-core';

document.removeEventListener('DOMContentLoaded', Prism.highlightAll);

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-haml';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-pug';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-stylus';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';

Prism.languages.insertBefore('javascript', 'function', { 'keyword console builtin': /console/ });
Prism.languages.insertBefore('js', 'function', { 'keyword console builtin': /console/ });
Prism.languages.insertBefore('jsx', 'function', { 'keyword console builtin': /console/ });

const builtin_keywords = ['process', 'Promise'];

const keyword_builtin = {
	'keyword builtin': {
		pattern: new RegExp(`\\b(${builtin_keywords.join('|')})\\b`)
	}
};

Prism.languages.insertBefore('javascript', 'constant', keyword_builtin);
Prism.languages.insertBefore('js', 'constant', keyword_builtin);
Prism.languages.insertBefore('jsx', 'constant', keyword_builtin);

const builtin_functions = ['require', 'setTimeout', 'setInterval'];

const function_builtin = {
	'function builtin': {
		pattern: new RegExp(`\\b(${builtin_functions.join('|')})\\b`)
	}
};

Prism.languages.insertBefore('javascript', 'function', function_builtin);
Prism.languages.insertBefore('js', 'function', function_builtin);
Prism.languages.insertBefore('jsx', 'function', function_builtin);

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

const function_prototype = {
	'function prototype': {
		pattern: new RegExp(`(\\.)\\b(${prototypes.join('|')})\\b`),
		lookbehind: true
	}
};

Prism.languages.insertBefore('javascript', 'class-name', function_prototype);
Prism.languages.insertBefore('js', 'class-name', function_prototype);
Prism.languages.insertBefore('jsx', 'class-name', function_prototype);

export default Prism;
