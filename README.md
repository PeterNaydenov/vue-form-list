# vue-form-list
**BROKEN!!!:** *Do not use it until repear*

Create and manipulate HTML-forms with a javascript objects.

## WARNING: UNDER HEAVY DEVELOPMENT!

Describe form as simple array of formset objects:

```js
[ formset, formset, formset ]

// formset is an object
let formset = { legend, fields, customClasses }

// legend : string(optional). Represents formset legend;
// fields  : field[](required). List of field descriptions;
// customClasses : className[](optional). Array of custom classnames applied to formset container;

let fields = [ field, field ];

// field is an object that describes input field. Field has few
// required properties but also have some optional. Full list of props
// is here:

{
      label         // string (required). Label infront of input;
    , id            // string (required). Should be a unique string;
    , value         // string (optional). Predefined value. Default value = '';
    , options       // enum(optional). List of possible values 
    , required      // boolean (optional). Flag to filter only required fields;
    , error         // string(optional). If any error should be displayed;
    , customClasses // Array of custom classnames applied to field container; 
}

// Example:

{
      label   : 'user'
    , value   : 'Darwin' 
    , id      : 'userName'
    , options : [ 'Darwin', 'Gumball', 'Penny' ] 
}

```
### field.options

There are two ways to describe options. As object with two properties: text and value. When text and value are equal the option can be represented with a string.
```js
, options : [ 
                { text: 'Darwin', value: 'fish' }
              , { text: 'Gumball', value: 'cat' }
              , 'Penny' // Equal to {text:'Penny', value: 'Penny' }
      ] 
```



## Methods

```js
   hide  : 'Hide elements with specific ids'
 , show  : 'Show elements with specific ids'
 , filter : 'Apply filter function on each field'
```





## Events

### form-ls:change
Triggered when value of field was changed. Listen for change event example:

```js
eBus.on ( 'form-ls:change', ([id,value]) => {
                // value contain the new value of 
        })

```





## Project setup

```
npm i @peterNaydenov/vue-form-list
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
