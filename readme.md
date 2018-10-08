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
|`controller`|Express middleware function|`(req, res)=>{}`|

Excir goes through all defined routes and methods in the specification list and try to map them to the controller that was defined. 


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