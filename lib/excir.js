const express = require("express");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

let walkDirectory = (dir) => {
    var queue = [dir];
    var fileList = [];

    while(queue.length > 0) {
        var currentDir = queue.pop();
        _.forEach(fs.readdirSync(currentDir), (file) => {
            var fullPath = path.join(currentDir, file);

            if(fs.statSync(fullPath).isDirectory()) {
                queue.push(fullPath);
            } else {
                fileList.push(fullPath);
            }
        });
    }

    return fileList;
};

function Excir(spec, config={}) {
    var router = express.Router();
    var requestMethods = ['get', 'post', 'delete', 'put', 'patch'];

    if(!spec) {
        throw new Error("First argument must be a specification file");
    }

    const _spec = spec;
    const controllerPath = _spec.controllerPath || null;
    const path = _spec.path || null;
    
    if(!controllerPath) {
        throw new Error("Must define a controller path");
    }

    if(!path) {
        throw new Error("Must define paths");
    }

    var controllerFiles = walkDirectory(controllerPath);
    var controllers = {};

    _.forEach(controllerFiles, (file) => {
        controllers[file.replace(".js", "")] = require(file);
    });



    return router;
}

module.exports = {walkDirectory, Excir};