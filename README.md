Rete context menu plugin - (React only version)
====

### Install

```
npm install rete-context-menu-plugin-react
```

With yarn,

```
yarn add rete-context-menu-plugin-react
```


#### Rete.js plugin

```js
import ContextMenuPlugin, { 
    ReactMenu,
} from 'rete-context-menu-plugin-react';

editor.use(ContextMenuPlugin, {
    Menu: ReactMenu, // required
    searchBar: false, // true by default
    searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
    delay: 100,
    allocate(component) {
        return ['Submenu'];
    },
    rename(component) {
        return component.name;
    },
    items: {
        'Click me'(){ console.log('Works!') }
    },
    nodeItems: {
        'Click me'(){ console.log('Works for node!') }
    }
});
```
| Options | Description | Default |
|-|-|-|
| `Menu` | 
| `searchBar` | Showing search bar | `true`
| `delay` | Delay hide, ms | `1000`
| `allocate` | function for placing of components into submenu | `() => []`
| `rename` | function for renaming of items| `component => component.name`
| `items` | custom items (`Object` with nested objects and functions) | `{}`
| `nodeItems` | custom items for Node menu | `{}`


You can arbitrarily put a component in a submenu. Examples: 

```js
allocate() { return ["Single submenu"] }
```

```js
allocate(component) { return component.path } // where path is a stack of menu for every component
```


```js
allocate(component) { return null } // exclude component from menu items
```

To change the items that create nodes, you may need to change the name.

```js
class MyComponent {
    constructor() {
        super("My comp");
        this.contextMenuName = "Add My comp";
    }
}
///
rename(component) { return component.contextMenuName || component.name }
```
