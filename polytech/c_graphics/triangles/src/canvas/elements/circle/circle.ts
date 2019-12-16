import { ElRepr, ElStyle, ElAction } from "../element_repr"
import { CanvasElement } from "../canvas_el"
import { Point } from "../point"

export class Circle extends CanvasElement {
    private center: Point;
    private radius: number;
    private fillcolor: string;
    private strokecolor: string;
    private linewidth: number;

    constructor(center: Point, radius: number,
        fillcolor: string="rgba(255, 255, 255, 0.5)", 
        strokecolor: string="black",
        linewidth: number=1) {
        super();

        this.center = center;
        this.radius = radius;
        this.strokecolor = strokecolor;
        this.linewidth = linewidth;
        this.fillcolor = fillcolor;
    }

    get __raw_el_repr(): ElRepr {
        // arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        
        el_repr.push(new ElAction("arc", [this.center.x, this.center.y, this.radius,
                                        0, 2 * Math.PI, false]));

        el_repr.push(new ElStyle("fillStyle", this.fillcolor));
        el_repr.push(new ElAction("fill"));

        el_repr.push(new ElStyle("lineWidth", this.linewidth.toString()));
        el_repr.push(new ElStyle("strokeStyle", this.strokecolor));
        el_repr.push(new ElAction("stroke"));

        return el_repr;
    }
}