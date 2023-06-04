# Frontend builder

## :fire: Особенности

- именование классов по [БЭМ](https://ru.bem.info/)
- используется БЭМ-структура
- используются препроцессоры [Pug](https://pugjs.org/) и [SCSS](https://sass-lang.com/)
- используется транспайлер [Babel](https://babeljs.io/) для поддержки современного JavaScript (ES6) в браузерах
- используется [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей
- используется проверка верстки по GPS через lightouse
- используется preview-страница для удобного тестирования страниц сайта и для "выгрузки" для внешних пользователей на тестирование.
- используется жёсткий кодгайд
- используется проверка кода на ошибки перед коммитом

## :hammer_and_wrench: Ограничения
- Используем LTS Node.js. Рекомендуется установка через [nvm](https://github.com/nvm-sh/nvm)
- На ПК должен бытьу становлен Python (с добавлением в PATH) + среды выполнения c++ visual studio (достаточно самого пакета. ставится в выборочной установке Visual Studio)

## :hammer_and_wrench: Установка

- установите [NodeJS](https://nodejs.org/en/) (если требуется) и [Yarn](https://yarnpkg.com/en/docs/install)
- скачайте сборку в консоли с помощью [Git](https://git-scm.com/downloads): `git clone`
- установите `gulp` глобально: `yarn global add gulp-cli`
- установите `bem-tools-core` глобально: `yarn global add bem-tools-core`
- перейдите в скачанную папку со сборкой: `cd`
- переключите yarn на работу в версии 2: `yarn set version berry`
- следом обновите до последней версии:`yarn set version latest`
- скачайте необходимые зависимости: `yarn`
- чтобы начать работу, введите команду: `yarn run dev` (режим разработки)
- чтобы собрать проект, введите команду `yarn run build --production` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.
Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер, svg спрайты.

## :open_file_folder: Файловая структура

```
Сборщик
├── dist
├── gulp
├── src
│   ├── blocks
│   ├── fonts
|   ├── icons
│   ├── img
│   ├── js
│   ├── styles
│   ├── userfiles
│   ├── videos
│   ├── pdf
│   ├── views
│   └── .htaccess
├── gulpfile.babel.js
├── webpack.config.js
├── package.json
├── .babelrc.js
├── .bemrc.js
├── .eslintrc.json
├── .stylelintrc
├── .stylelintignore
└── .gitignore
```

- Корень папки:
  - `.babelrc.js` — настройки Babel
  - `.bemrc.js` — настройки БЭМ
  - `.eslintrc.json` — настройки ESLint
  - `.gitignore` – запрет на отслеживание файлов Git'ом
  - `.stylelintrc` — настройки Stylelint
  - `.stylelintignore` – запрет на отслеживание файлов Stylelint'ом
  - `gulpfile.babel.js` — настройки Gulp
  - `webpack.config.js` — настройки Webpack
  - `package.json` — список зависимостей
- Папка `src` - используется во время разработки:
  - БЭМ-блоки и компоненты: `src/blocks`
  - шрифты: `src/fonts`
  - спрайты: `src/icons`
  - изображения: `src/img`
  - JS-файлы: `src/js`
  - страницы сайта: `src/views/pages`
  - SCSS-файлы: `src/styles`
  - служебные Pug-файлы: `src/views`
  - конфигурационный файл веб-сервера Apache с настройками [gzip](https://habr.com/ru/post/221849/) (сжатие без потерь): `src/.htaccess`
- Папка `dist` - папка, из которой запускается локальный сервер для разработки (при запуске `yarn run dev`)
- Папка `gulp` - папка с Gulp-тасками

## :keyboard: Команды

- `yarn lint:test` - проверить SCSS-файлы и JS-файлы. Для VSCode необходимо установить [плагин](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint). Для WebStorm
  или PHPStorm необходимо включить Stylelint в `Languages & Frameworks - Style Sheets - Stylelint` (ошибки будут исправлены автоматически при сохранении файла)
- `yarn lint:css --fix` - исправить ошибки в SCSS-файлах
- `yarn lint:js --fix` - исправить ошибки в JS-файлах
- `yarn dev` - запуск сервера для разработки проекта
- `yarn build` - собрать проект с оптимизацией без запуска сервера
- `yarn build:views` - скомпилировать Pug-файлы
- `yarn build:styles` - скомпилировать SCSS-файлы
- `yarn build:scripts` - собрать JS-файлы
- `yarn build:images` - собрать изображения
- `yarn build:webp` - сконвертировать изображения в формат `.webp`
- `yarn build:sprites`- собрать спрайты
- `yarn build:fonts` - собрать шрифты
- `yarn build:favicons` - собрать фавиконки
- `yarn build:gzip` - собрать конфигурацию Apache

## :bulb: Рекомендации по использованию

### Компонентный подход к разработке сайтов

- каждый БЭМ-блок имеет свою папку внутри `src/blocks/modules`
- папка одного БЭМ-блока содержит в себе один Pug-файл, один SCSS-файл и один JS-файл (если у блока используется скрипт)
  - Pug-файл блока импортируется в файл `src/views/index.pug` (или в необходимый файл страницы, откуда будет вызываться блок)
  - SCSS-файл блока импортируется в файл `src/blocks/modules/_modules.scss`
  - JS-файл блока импортируется в `src/js/import/modules.js`

Пример структуры папки с БЭМ-блоком:

```
blocks
├── modules
│   ├── header
│   │   ├── header.pug
│   │   ├── header.js
│   │   ├── header.scss
```

Чтобы вручную не создавать соответствующие папку и файлы, достаточно в консоли прописать следующие команды:

- `bem create my-block` - для создания папки БЭМ-блока, где `my-block` - имя БЭМ-блока
- `bem create my-component -l src/blocks/components` для создания компонента
- `bem create my-component -l src/blocks/components && bem create my-block` - создать всё вместе

### Компоненты

- компоненты (например, иконки, кнопки) оформляются в Pug с помощью примесей
- каждый компонент имеет свою папку внутри `src/blocks/components`
- папка одного компонента содержит в себе один Pug-файл, один SCSS-файл и один JS-файл (если у компонента используется скрипт)
  - Pug-файл компонента импортируется в файл главной страницы `src/views/index.pug` (или в необходимый файл страницы, откуда будет вызываться компонент)
  - SCSS-файл компонента импортируется в файл `src/blocks/components/_components.scss`
  - JS-файл компонента импортируется в файл `src/js/import/components.js`

### Страницы проекта

- страницы проекта находятся в папке `src/views/pages`
  - каждая страница (в том числе главная) наследует шаблон `src/views/layouts/default.pug`
  - главная страница: `src/views/homepage.pug`

### Страница вместо index

- страницы проекта находятся в папке `src/index.yaml`
  - каждая страница (в том числе главная) указывается в этом файле. Второй параметр - процентное соотношение выполненных работ.

### Шрифты

- шрифты находятся в папке `src/fonts`
  - используйте [форматы](https://caniuse.com/#search=woff) `.woff` и `.woff2`
  - шрифты подключаются в файл `src/styles/base/_fonts.scss`
  - сконвертировать локальные шрифты можно с помощью [данного сервиса](http://fontsquirrel.com/)
  - при подключении шрифтов используем свойство `font-display: swap;` для улучшения оптимизации при загрузки страницы 

### Изображения

- изображения находятся в папке `src/img`
  - изображение для генерации фавиконок должно находиться в папке `src/img/favicon` и иметь размер не менее `1024px x 1024px`
  - изображения автоматически конвертируются в формат `.webp`. Подробная информация по использованию [тут](https://vk.com/@vk_it-webp).
  - используется миксин +webp(name, type='jpg', lazy,  alt)

### Используем svg спрайты. shadow-root.

- у нас существует папка `src/icons`, в которой находятся три папки: 
  - `src/icons/png`
  - `src/icons/svg-colors`
  - `src/icons/svg-mono`
- Принцип работы довольно прост, закидываем нужную нам картинку в папку, формата, который у нас имеется. Что касается svg, если вся svg в одном цвете, закидываем в папку `src/icons/svg-mono`, в противном случае в `src/icons/svg-colors`
- Далее у нас генерируются спрайты в `src/styles/generated/_sprite-{svg, svg-color, svg-mono, png}.scss` и собирается спрайт в `svg`, который в дальнейшем вставляется при сборке в html-код.
- В pug подключаем иконку просто: 
````
.header__logo
  +svgColor("logo")
````
- Далее смотрим в макете высоту картинки, ставим в `scss` свойство `font-size` для родителя иконки равный высоте картинки в макете.
- Если все сделано верно, а иконка выглядит не так, как в макете, значит проблема в том как она сделана в макете дизайна, в таком случае нужно обращаться к дизайнерам. 

### Сторонние библиотеки

- все сторонние библиотеки устанавливаются в папку `node_modules`
  - для их загрузки воспользуйтеcь командой `yarn add package_name`
  - для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла БЭМ-блока (то есть тот БЭМ-блок, который использует скрипт), например:
  ```javascript
  import $ from "jquery";
  ```
  - для подключения стилевых файлов библиотек импортируйте их в файл `src/styles/vendor/_libs.scss`, также можно обратиться к папке `node_modules` и найти нужный scss
  - JS-файлы и стилевые файлы библиотек самостоятельно изменять нельзя
  - Если подключенный плагин вызывает ошибку ниже, его необходимо подключить через `script-loader!`
  ```javascript
  Error: module property was removed from Dependency

  import $ from "script-loader!jquery";
  ```

:warning: Если в вашем проекте используется несколько библиотек, которые необходимо подключать на нескольких страницах, во избежании ошибок нужно:

- по пути `src/js/import` создать папку `pages`
- в папке `pages` создать js-файл для страницы, например, `pageA.js`, и импортировать туда библиотеку, которая будет использоваться только на этой странице
- аналогично проделать шаг для дополнительных страниц
- в файле `webpack.config.js` в точку входа добавить js-файлы страниц, пример:

```javascript
entry: {
    main: "./src/js/index.js",
    pageA: "./src/js/import/pages/pageA.js",
    pageB: "./src/js/import/pages/pageB.js"
}
```
- подключить скомпилированные js-файлы на необходимых страницах

### Оптимизация сайта (графика)
- Первое, что нужно сделать это установить lazyload, в нашем случае используется [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload).
  - прописываем `yarn add vanilla-lazyload`
  - подключаем его в наш проект, желательно сделать это в `header.js` или в блоке, который находится выше всех остальных.
  ```javascript
  import LazyLoad from "vanilla-lazyload";
  ```
  - так же прописываем 
  
  ```javascript
  const lazyLoadInstance = new LazyLoad({});
  ```
  - в `new Lazyload({})` мы можем прописать опции, если требуется

- Когда подключаем картинки, используем тег `<picture>` (если только это не svg формат). Подробнее про использование данного тега, можно посмотреть [тут](https://developer.mozilla.org/ru/docs/Web/HTML/Element/picture). В нашем сборщике используется mixin для pug, который упрощает запись:
```
  +webp('путь картинки без img/', 'тип изображения(jpg, png)', 'lazy (для vanilla-lazyload)', alt)

```
- SVG картинки подключаем просто через тег `<img>`: 
```
img.lazy(data-src="img/poster/img/2.svg" alt="")

```
- обязательно к src приписываем `data-`

### Дополнительные моменты
- После подключения библиотеки JQuery
```javascript
import $ from "jquery";
```
- Нужно поставить код под подключением, который указан ниже, дабы избежать проблем с обнаружением JQuery со сторонних сервисов, обработчиков и тд. В нашем случае, чаще всего им выступает `lander`.
```javascript
global.$ = global.jQuery = $;
```
- То же самое нужно проделать и с Fancybox
```javascript
import fancybox from "@fancyapps/fancybox";
window.fancybox = $.fancybox;
```