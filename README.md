# go2joy_sa

## Introduction Modules Structure

A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries. This helps us manage complexity and develop with - [SOLID](https://en.wikipedia.org/wiki/SOLID). principles,
especially as the size of the application and/or team grow.

Each Module includes router, store, components, view, ... 
## Install packages
```
yarn
```

## Run your code in development mode
```
yarn serve
```

## Build you code for deploy
```
yarn build
```
## Run Test Unit
```
yarn test:unit
```

## Folder Structure and Description
```
├── README.md
├── babel.config.js
├── jest.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   ├── apiCaller.js
│   │   └── auth.js
│   ├── assets
│   │   ├── images
│   │   │   ├── logo
│   │   │   │   ├── logo-small.png
│   │   │   │   └── logo.png
│   │   │   └── svg
│   │   │       ├── direct-discount.svg
│   │   │       ├── en.svg
│   │   │       ├── extra-fee.svg
│   │   │       ├── flash-sale.svg
│   │   │       ├── fs-report.svg
│   │   │       └── vn.svg
│   │   └── styles
│   │       ├── main.scss
│   │       └── reset.scss
│   ├── components
│   │   ├── NotFoundPage.vue
│   │   ├── SaHeader.vue
│   │   ├── SaSidebar.vue
│   │   └── globals
│   ├── layouts
│   │   ├── guest.vue
│   │   └── member.vue
│   ├── main.js
│   ├── mixins
│   │   └── global.js
│   ├── modules
│   │   ├── activities
│   │   │   ├── api.js
│   │   │   ├── index.js
│   │   │   ├── store
│   │   │   │   ├── actions.js
│   │   │   │   ├── getters.js
│   │   │   │   ├── index.js
│   │   │   │   ├── mutations.js
│   │   │   │   └── state.js
│   │   │   └── view.vue
│   │   ├── dashboard
│   │   ├── hotel
│   │   └── index.js
│   ├── plugins
│   │   └── element-ui.js
│   ├── router.js
│   └── stores
│       ├── index.js
│       └── modules
│           └── auth
│               ├── actions.js
│               ├── getters.js
│               ├── index.js
│               ├── mutations.js
│               └── state.js
├── tests
│   ├── unit
│   │   └── layout.spec.js
│   └── vueSetup.js
└── yarn.lock
```
## Packages
I've already added below components you mentioned.
 - vue-router
 - vuex
 - element-ui
 - unit test
### When and why we need to use Vuex (https://vuex.vuejs.org/)
First of all, Don't use EventBus for just sharing data between parent and child component. It will make a code which has less readability.
Use vuex store or props and emit for sharing data.
Props could be a good way to share a few data from parent component to child component in a single direction.
However, it also has disadvantages. so if we need to share many data in complex component hierarchy, vuex store can be a better solution.

#### vuex state management
![alt](https://vuex.vuejs.org/vuex.png)

- **state** - define the values you want to store
- **getters** - use getter to refer to the state
- **mutations** - It is not recomended to change state directly. We have to use mutation in order to change the state.
- **actions** - In order to change the state we also can use action, but action can have asynchronous code like calling API.
   After calling API, we can call mutation to store the result of the API, if the result need to be used by child components.

For more understanding, please refer to official web site. (https://vuex.vuejs.org/)

### Unit test
Vue Test Utils is the official unit testing utility library for Vue.js.
[Vue test Utils](https://vue-test-utils.vuejs.org/api/#mount)