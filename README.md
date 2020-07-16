# RSLANG GROUP 67

### [Ссылка на деплой проекта](https://rslang-team67-icexes.netlify.app/)

## Наша команда

| Участник | Роль в проекте |
| ------ | ------ |
| [Денис Субоч](https://github.com/icexes) | Тимлид. Создал основной функционал приложения: "изучать слова", словарь, мини игру SpeakIt. Ответственный за презентацию приложения |
| [Александр Зайцев](https://github.com/zaytsev-alex) | Разработчик. Создал мини игру Sprint, главную страницу приложения, страницу настроек, страницу статистики |
| [Дмитрий Колосовский](https://github.com/dmikol) | Разработчик. Создал мини игру Аудиовызов |
| [Александр Чубуков](https://github.com/ronic404) | Разработчик. Создали мини игру English Puzzle и страницу регистрации |
| [Станислав Короткий](https://github.com/staskorotkiy92) | Разработчик. Создал интро-страницу, промо-страницу и страницу о команде |

Технологии которые мы исользовали:

  - Webpack
  - Babel
  - Eslint
  - SCSS
  - Vanilla JS ONLY

## WEBPACK:
Webpack — это инструмент, позволяющий скомпилировать, например, JavaScript модули в единый JS-файл. Webpack также известен как сборщик модулей.
При большом количестве файлов он создает один объемный файл (или несколько файлов) для запуска вашего приложения.
Он также способен выполнять множество иных операций:
 -	помогает собрать воедино ваши ресурсы
 -	следит за изменениями и повторно выполняет задачи
 -	может выполнить транспиляцию JavaScript следующего поколения до более старого стандарта JavaScript (ES5) с помощью Babel, что позволит использовать новейшие функции JavaScript, не беспокоясь о том, поддерживает их браузер или нет
 -	может запустить webpack-dev-server (в нём встроен локальный сервер и livereload (“живая перезагрузка браузера”))

## BABEL:
Итак, мы знаем, что есть спецификация, а есть ее реализация. Знаем, что реализация зачастую отстает от спецификации. Более того, разные реализации по-разному отстают от спецификации. Написав код, мы не можем гарантировать, где он будет запускаться, а где — нет.
Babel — утилита, которая берет указанный код и возвращает тот же код, но транслированный в старую версию JS.
Babel состоит из многих частей:
 -	Пакет @babel/core содержит код, который выполняет всю работу по трансляции, но не содержит внутри себя правил преобразования. Правила описаны в отдельных пакетах, называемых плагинами (например, babel-plugin-transform-constant-string).
 -	@babel/preset-env. Пресет - это группа плагинов, которую можно подключить к Babel целиком. preset-env - основной пресет поддерживаемый командой Babel, который содержит внутри себя плагины, реализующие стандартизированные возможности js.
 -	Пакет @babel/cli обеспечивает возможность работы с бабелем через терминал. Предоставляет командную утилиту babel. Ниже рассматривается ее использование.
 -	Пакет @babel/node - еще одна утилита командной строки: babel-node.

## ESLINT

ESLint - это линтер для языка программирования JavaScript, написанный на Node.js.

Он чрезвычайно полезен, потому что JavaScript, будучи интерпретируемым языком, не имеет этапа компиляции и многие ошибки могут быть обнаружены только во время выполнения.

ESLint поможет тебе:

 - найти существующие ошибки в коде;
 - избежать глупых ошибок;
 - избежать бесконечные циклы в условиях цикла for;
 - убедится, что все методы getter возвращают что-то;
 - не разрешить выражения console.log (и аналогичные);
 - проверить наличие дубликатов cases в switch;
 - проверить недоступный код;

## SCSS

SCSS — "диалект" языка SASS. А что такое SASS? SASS это язык похожий на HAML (весьма лаконичный шаблонизатор), но предназначенный для упрощения создания CSS-кода. Проще говоря, SASS это такой язык, код которого специальной ruby-программой транслируется в обычный CSS код. Синтаксис этого языка очень гибок, он учитывает множество мелочей, которые так желанны в CSS. Более того, в нём есть даже логика (@if, each), математика (можно складывать как числа, строки, так и цвета). Возможно, некоторые возможности SCSS покажутся вам избыточными, но, лишними они не будут.

Отличие SCSS от SASS заключается в том, что SCSS больше похож на обычный CSS код. Пример SASS-кода:
```sh

$blue: #3bbfce
$margin: 16px

.content-navigation
  border-color: $blue
  color: darken($blue, 9%)

.border
  padding: $margin / 2
  margin: $margin / 2
  border-color: $blue
```

И тоже самое на SCSS:

```sh

$blue: #3bbfce;
$margin: 16px;

.content-navigation {
  border-color: $blue;
  color: darken($blue, 9%);
}

.border {
  padding: $margin / 2;
  margin: $margin / 2;
  border-color: $blue;
}

```

## Установка

Необходим [Node.js](https://nodejs.org/) для запуска.

Сначала необходимо склонировать репозиторий

```sh
$ git clone https://github.com/Icexes/rslang.git
```

Далее нужно установить все зависимости проекта

```sh
$ npm install
```

Проект можно запустить в режиме разработки, в нем все изменения тут же будут отоброжаться на странице

```sh
$ npm run dev
```

Или можно собрать проект при помощи команды

```sh
$ npm run build
```

И в папке ` dist ` будет лежать готовая сборка
