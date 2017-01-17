var makerjs = require("makerjs") as typeof MakerJs;

module.exports = function (svgPathData: string, distance: number, options: { joints?: number, origin?: MakerJs.IPoint, outline?: number } = {}): string {

    var model = makerjs.importer.fromSVGPathData(svgPathData);
    var expanded = makerjs.model.expandPaths(model, distance, options.joints);

    makerjs.model.originate(expanded);
    makerjs.model.simplify(expanded);

    return makerjs.exporter.toSVGPathData(expanded, false, options.origin || [0, 0]) as string;
}
