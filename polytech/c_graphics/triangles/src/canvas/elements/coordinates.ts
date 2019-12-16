import { CanvasElement } from "./canvas_el"
import { Point } from "./point"
import { ElRepr, ElAction, ElStyle } from "./element_repr"
import { Circle } from "./circle/circle"
import { EquilateralTriangleCreator } from "./triangle/equilateral"

export class Coordinates extends CanvasElement {
    private basis: Point;
    private x_end: number;
    private y_end: number;
    private line_width: number;
    private color: string;
    private marks: number;
    private mark_radius: number;

    constructor(x_end: number, y_end: number, line_width: number = 1, color: string = "#000",
                marks: number = 10, mark_radius: number = 2) {
        super();
        this.basis = new Point(4, 4);
        this.x_end = x_end;
        this.y_end = y_end;
        this.line_width = line_width;
        this.color = color;
        this.marks = marks;
        this.mark_radius = mark_radius;
    }

    get __raw_el_repr(): ElRepr {
        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        el_repr.push(new ElAction("moveTo", this.basis.into_array()));
        el_repr.push(new ElAction("lineTo", [this.x_end, this.basis.y]));
        el_repr.push(new ElAction("lineTo", [this.x_end - 10, this.basis.y + 5]));

        el_repr.push(new ElAction("moveTo", this.basis.into_array()));
        el_repr.push(new ElAction("lineTo", [this.basis.x, this.y_end]));
        el_repr.push(new ElAction("lineTo", [this.basis.x + 5, this.y_end - 10]));

        el_repr.push(new ElStyle("lineWidth", String(this.line_width)));
        el_repr.push(new ElStyle("strokeStyle", this.color));
        el_repr.push(new ElAction("stroke"));

        // we need to find the step and then moving
        // with one step at moment draw dots on our scale
        // TODO: move this out to method
        let step = this.x_end / this.marks;
        for (var i = 1; i < this.marks; i++) {
            let x_circle = new Circle(new Point(step * i, this.basis.y), 
                            this.mark_radius, this.color);
            let y_circle = new Circle(new Point(this.basis.x, step * i), 
                            this.mark_radius, this.color);
            el_repr.push(...x_circle.el_repr);
            el_repr.push(...y_circle.el_repr);
        }

        // and now add name for axes
        el_repr.push(new ElStyle("font", "10px Comic Sans MS"));
        el_repr.push(new ElStyle("fillStyle", "black"));
        el_repr.push(new ElStyle("textAlign", "center"));
        el_repr.push(new ElAction("fillText", ["y-axis", this.x_end / 2, this.basis.y + 10]));

        el_repr.push(new ElStyle("font", "10px Comic Sans MS"));
        el_repr.push(new ElStyle("fillStyle", "black"));
        el_repr.push(new ElStyle("textAlign", "center"));
        el_repr.push(new ElAction("translate", [this.basis.x + 10, this.y_end / 2]));
        el_repr.push(new ElAction("rotate", [(-Math.PI/2).toString()]));
        el_repr.push(new ElAction("fillText", ["x-axis", 0, 0]));
        
        return el_repr;
    }
}