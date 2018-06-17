# ghmd
a *relatively* accurate github flavoured markdown preview

[**use it**](https://harryparkdotio.github.io/ghmd)

## features
#### code highlighting
`js`
```js
const isHighlighted = true;

if(isHighlighted) {
	console.log('woot woot!');
}
```

`php`
```php
<?php

var $php_is_supported = 'but that still doesn\'t mean you should use it';

$servername = 'localhost:1337';
$username = 'root';
$password = 'password123';
$dbname = 'users';

$conn = new mysqli($servername, $username, $password, $dbname)
$sql = 'SELECT username, password, date_of_birth, mothers_maiden_name, pets_name FROM users' + $_GET['query'];

$result = $conn->query($sql);

?>
```

`python`
```python
from * import <insert project name here> as project

if __name__ == "__main__":
	project.run()
```

`bash`
```bash
$ git add .
$ git commit -m "idk"
$ git push --force
$ sudo rm -rf
```

`css`
```css
* body {
	color: #000 !important;
	background-color: #000 !important;
}
```

> enabled languages
> `bash`, `clike`, `c`, `csharp`, `cpp`, `css`, `diff`, `git`, `docker`, `go`, `haml`, `java`, `javascript`, `json`, `less`, `markup`, `markup-templating`, `markdown`, `handlebars`, `php`, `pug`, `python`, `jsx`, `tsx`, `ruby`, `sass`, `scss`, `stylus`, `swift`, `twig`, `typescript`, `yaml`
>
> *not all are included for the sake of speed and efficiency*

#### emoji :poop: :fire: :100:
```markdown
#### emoji :poop: :fire: :100:
```
> uses the same emoji names as github

#### completely local
no calls to home, no fonts that track you, no data collection

#### offline mode / PWA
this is a PWA (progressive web app), meaning everything works without an active network connection

#### file drag 'n' drop
> try it!

## run
### dev
```bash
$ npm run dev
```

## build
```bash
$ npm run build
```

## setup
### clone
```bash
$ git clone https://github.com/harryparkdotio/ghmd.git
```

### install dependencies
```bash
$ npm i
```

## notes
### code highlighting
- kinks with the github style for code highlighting are still being worked out, if you come across a bug, please submit an issue with an image of the way github displays it and how this displays it.
