# excir
A simple router builder for Express and Koa.

## How to install?
```bash
npm i excir
```

## How it works

|Term|What it means?|Example|
|---|---|---|
|`route`|HTTP Endpoint|`/pets`|
|`method`|HTTP Request Method|`GET`|
|`controller`|Express middleware function name|`getPet`|

**The value for `Controller` is the name of the file that contains the implementation. Excir will refer to the function by its filename. Currently, Excir does not take nested directory (namespace) into consideration. Thus, while having nested directory is possible, the function name has to be unique.**

Example: `getPet.js`
```javascript
// getPet.js
module.exports = (req, res) => {
    res.send("Pet");
}
```

Excir goes through all defined routes and methods in the specification list and try to map them to the controller that was defined. 

You do not need to require `express` in every Controller file.

## Functions
### `Excir()`
The heart of this library. Returns a `router` object/function depending on the backend selected.

### `walkDirectory()`
A synchronous function to walk through the directory and retrieve the js files. Exposed for testing purposes.

## Options
The `Excir()` function takes in a config object as its second argument.

|Property|What it means?|Type|Default value|Valid values|
|---|---|---|---|---|
|`backend`|Which backend to use|`string`|`express`|`express`, `koa`|


## API spec
```javascript
{
    controllerPath: string
    path: {
        "route": {
            "method": {
                "controller": string
            }
        }
    }
}
```

## How to use
```javascript
const express = require("express");
const Excir = require("excir").Excir;

var spec = {
    // The directory that contains all route implementations
    controllerPath: "controller"
    path: {
        "/": {
            // HTTP Request Method -> function
            /*
                getRoot.js
                ----------
                module.exports = (req, res) => {};
            */
            "get": {
                "controller": "getRoot"
            },
            "post": {
                "controller": "submitForm"
            }
        },
        "/pets": {
            "get": {
                "controller": "getPets"
            }
        },
        "/pets/{id}": {
            "get": {
                "controller": "getPetById"
            }
        }
    }
}

var app = express();
var router = Excir(spec);

app.use("/", router);
app.listen(8080);
```

## Changelog
### 0.0.2
Added Koa routing support

### 0.0.1
Documentation 

## Future Plans

- [ ] Expose the Excir function only in `index.js`.