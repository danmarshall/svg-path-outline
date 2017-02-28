export interface options {
    bezierAccuracy?: number;
    joints?: number;
    inside?: boolean;
    outside?: boolean;
    tagName?: 'path' | 'polygon' | 'polyline';
}
export default function outline(svgData: string, distance: number, opts?: options): string;
