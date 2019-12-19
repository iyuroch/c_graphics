import { ElRepr, ElStyle, ElAction } from "../element_repr"
import { CanvasElement } from "../canvas_el"
import { Point } from "../point"

export class Parallelogram extends CanvasElement {
    private base: Point;
    private a: Point;
    private b: Point;
    private c: Point;
    private d: Point;
    public fillcolor: string;
    public strokecolor: string;
    public linewidth: number;

    constructor(a: Point, b: Point, c: Point,
        fillcolor: string="rgba(255, 255, 255, 0.5)", 
        strokecolor: string="black",
        linewidth: number=1) {
        super();

        this.fillcolor = fillcolor;
        this.strokecolor = strokecolor;
        this.linewidth = linewidth;

        // to get fourth point
        // proof by diagonal cross
        // they bisect each other in half
        let d = new Point();
        d.x = a.x + b.x - c.x;
        d.y = a.y + b.y - c.y;

        // we choose for base bot left point
        this.base = [a, b, c, d].sort((a, b) => a.y - b.y || a.x - b.x)[0];

        this.a = a.substract(this.base);
        this.b = b.substract(this.base);
        this.c = c.substract(this.base);
        this.d = d.substract(this.base);
    }

    public rotate(degrees: number) {
        // little hack to have correct
        // display in 180 degrees
        degrees -= 0.1;
        this.a = this.a.rotate(degrees);
        this.b = this.b.rotate(degrees);
        this.c = this.c.rotate(degrees);
        this.d = this.d.rotate(degrees);
        this.changed();
    }

    get __raw_el_repr(): ElRepr {
        // we need to find close to and far to base elements
        // this will be first and last
        // and then we swap the last with some in the middle
        // so that we have nice line
        let points = [this.a, this.b, this.c, this.d].sort(
            (a, b) => a.y - b.y || a.x - b.x);
        [points[2], points[3]] = [points[3], points[2]];

        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        el_repr.push(new ElAction("moveTo", points[0].into_array()));

        for (const point of points) {
            el_repr.push(new ElAction("lineTo", point.into_array()));
        }
        
        el_repr.push(new ElAction("closePath"));

        el_repr.push(new ElStyle("fillStyle", this.fillcolor));
        el_repr.push(new ElAction("fill"));

        el_repr.push(new ElStyle("lineWidth", this.linewidth.toString()));
        el_repr.push(new ElStyle("strokeStyle", this.strokecolor));
        el_repr.push(new ElAction("stroke"));

        return el_repr;
    }
}