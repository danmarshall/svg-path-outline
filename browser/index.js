require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"svg-path-outline":[function(require,module,exports){
"use strict";
var makerjs = require("makerjs");
function outline(svgData, distance, opts) {
    var defaultOptions = {
        bezierAccuracy: 0.25,
        joints: 0,
        outside: true,
        tagName: 'path'
    };
    var o = makerjs.extendObject(defaultOptions, opts);
    var closed = true;
    var input;
    switch (o.tagName) {
        case 'polyline':
            closed = false;
        //fall through
        case 'polygon':
            //use points. 
            //Need to mirror them on y axis because they are expected to be in MakerJs coordinate space
            input = makerjs.model.mirror(new makerjs.models.ConnectTheDots(closed, svgData), false, true);
            break;
        default:
            input = makerjs.importer.fromSVGPathData(svgData, { bezierAccuracy: o.bezierAccuracy });
            break;
    }
    var result;
    if (o.inside && o.outside) {
        result = makerjs.model.expandPaths(input, distance, o.joints);
    }
    else {
        result = makerjs.model.outline(input, distance, o.joints, o.inside);
    }
    makerjs.model.simplify(result);
    return makerjs.exporter.toSVGPathData(result, false, [0, 0]);
}
exports.__esModule = true;
exports["default"] = outline;
module.exports = outline;

},{"makerjs":"makerjs"}]},{},[]);
