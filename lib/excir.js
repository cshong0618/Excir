const express = require("express");
const koaRouter = require("koa-router");
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

var defaultConfig = {
    __dirname,
    backend: 'express'
}

function Excir(spec, config=defaultConfig) {
    config.__dirname = config.__dirname || defaultConfig.__dirname;
    config.backend = config.backend || defaultConfig.backend;

    var router = config.backend === 'express' ? express.Router() : new koaRouter();
    var requestMethods = ['get', 'post', 'delete', 'put', 'patch'];

    if(!spec) {
        throw new Error("First argument must be a specification file");
    }

    const _spec = spec;
    const controllerPath = _spec.controllerPath || null;
    const paths = _spec.path || null;
    
    if(!controllerPath) {
        throw new Error("Must define a controller path");
    }

    if(!path) {
        throw new Error("Must define paths");
    }

    var controllerFiles = walkDirectory(controllerPath);
    var controllers = {};

    _.forEach(controllerFiles, (file) => {
        controllers[file.split("/").pop().replace(".js", "")] = require(file);
    });

    _.forEach(paths, (routeBody, route) => {
        var processedRoute = route.split("{").join(":").split("}").join("");
        _.forEach(_.pick(routeBody, requestMethods), (methodBody, method) => {
            router[method](processedRoute, controllers[methodBody.controller]);
        });
    });

    return router;
}

module.exports = {walkDirectory, Excir};