# excir
A simple Express router builder.

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