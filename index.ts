import * as makerjs from "makerjs";

export interface Options {
    joints?: number;
    outside?: boolean;
    tagName?: 'path' | 'polygon' | 'polyline';
}

module.exports = function (svgData: string, distance: number, options?: Options): string {

    const defaultOptions: Options = { joints: 0, outside: true, tagName: 'path' };

    var o = makerjs.extendObject(defaultOptions, options) as Options;

    let closed = true;
    let model: MakerJs.IModel;

    switch (o.tagName) {
        case 'polyline':
            closed = false;
            //fall through

        case 'polygon':
            model = makerjs.model.mirror(new makerjs.models.ConnectTheDots(closed, svgData), false, true);
            break;

        default:
            model = makerjs.importer.fromSVGPathData(svgData);
            break;
    }

    var scaleUp = 1000;

    //scale up
    makerjs.model.scale(model, scaleUp);

    var outlined = makerjs.model.outline(model, distance * scaleUp, o.joints, !o.outside);
    //var outlined = makerjs.model.expandPaths(model, distance * 1000);

    makerjs.model.simplify(outlined);

    //scale down
    makerjs.model.scale(outlined, 1 / scaleUp);

    return makerjs.exporter.toSVGPathData(outlined, false, [0, 0]) as string;
}