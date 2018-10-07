const assert = require("assert");
var Excir = require("../index").Excir;
var walkDirectory = require("../lib/excir").walkDirectory;

it("should throw an error when no arguments are passed in", () => {
    assert.throws(() => {Excir()}, Error);
});

it("should throw an error when the controllerPath is null/empty", () => {
    var spec = {
        controllerPath: ""
    };

    assert.throws(() => {Excir(spec)}, Error);    
});

it("should throw an error when the path is null/empty", () => {
    var spec = {
        controllerPath: "controllers",
        path: ""
    };

    assert.throws(() => {Excir(spec)}, Error);
});

var path = `${__dirname}/controller`;

it("walkDirectory should return an array", () => {
    assert.deepEqual(Array.isArray(walkDirectory(path)), true);
});

it("walkDirectory should return the contents of the folder", () => {
    var files = [
        `${__dirname}/controller/getData.js`,
        `${__dirname}/controller/postData.js`,
        `${__dirname}/controller/inner/get.js`,
    ];

    var actualResult = walkDirectory(path);
    assert.deepEqual(actualResult, files);
});

it("should map routes in spec to express.Router", () => {
    var spec = {
        controllerPath: path,
        path: {
            "getData": {
                "get": {
                    "controller": "getData"
                },
                "post": {
                    "controller": "postData"
                }
            },
            "inner/get": {
                "get": {
                    "controller": "get"
                }
            }
        }
    };

    var router = Excir(spec);
    
    var methodCount = Object.keys(spec.path)
        .map(key => Object.keys(spec.path[key]).length)
        .reduce((acc, cur) => acc + cur, 0);

    var actualMethodCount = router.stack.map(x => x.route.path).length;

    assert.deepEqual(actualMethodCount, methodCount);
});