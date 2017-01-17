var makerjs = require("makerjs");
module.exports = function (svgPathData, distance, options) {
    if (options === void 0) { options = {}; }
    var model = makerjs.importer.fromSVGPathData(svgPathData);
    var expanded = makerjs.model.expandPaths(model, distance, options.joints);
    makerjs.model.originate(expanded);
    makerjs.model.simplify(expanded);
    return makerjs.exporter.toSVGPathData(expanded, false, options.origin || [0, 0]);
};
