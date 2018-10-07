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
        `${__dirname}/controller/inner/get.js`
    ];
    
    var actualResult = walkDirectory(path);
    assert.deepEqual(actualResult, files);
});