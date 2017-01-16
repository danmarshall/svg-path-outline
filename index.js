var makerjs = require("makerjs");
module.exports = function (svgPathData, distance, joints) {
    var model = makerjs.importer.fromSVGPathData(svgPathData);
    var expanded = makerjs.model.expandPaths(model, distance, joints);
    makerjs.model.originate(expanded);
    makerjs.model.simplify(expanded);
    return makerjs.exporter.toSVGPathData(expanded, false);
};
