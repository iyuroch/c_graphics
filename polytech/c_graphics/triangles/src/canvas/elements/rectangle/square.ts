import { ElRepr, ElStyle, ElAction } from "../element_repr"
import { CanvasElement } from "../canvas_el"
import { Point } from "../point"

// TODO: implement multiple ways to create square
export class SquareCreator {
    // create with bot_left and top_right points
    // create with side and skew of this side
    // create with halfside and angle
    static fromCenterSide(center: Point, side: number, angle: number=90): Square {
        return new Square(new Point(center.x + side / 2, center.y + side / 2), 
                new Point(center.x - side / 2, center.y - side / 2));
    }
}

// TODO: add angle of side
// TODO: remove bot_left, top_left as it's not correct in all cases
export class Square extends CanvasElement {
    private top_right: Point;
    private bot_left: Point;
    private fillcolor: string;
    private strokecolor: string;
    private linewidth: number;

    constructor(top_right: Point, bot_left: Point,
                fillcolor: string="rgba(255, 255, 255, 0.5)", 
                strokecolor: string="black",
                linewidth: number=1) {
        if (top_right.x < bot_left.x ||
            top_right.y < bot_left.y) {
            throw new Error("Your top_right should be to top and right of bot_left");
        }

        super();
        this.top_right = top_right;
        this.bot_left = bot_left;
        this.fillcolor = fillcolor;
        this.strokecolor = strokecolor;
        this.linewidth=linewidth;
    }

    get __raw_el_repr(): ElRepr {
        let top_left = new Point(this.bot_left.x, this.top_right.y);
        let bot_right = new Point(this.top_right.x, this.bot_left.y);

        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        el_repr.push(new ElAction("moveTo", top_left.into_array()));
        el_repr.push(new ElAction("lineTo", this.top_right.into_array()));
        el_repr.push(new ElAction("lineTo", bot_right.into_array()));
        el_repr.push(new ElAction("lineTo", this.bot_left.into_array()));
        el_repr.push(new ElAction("closePath"));

        el_repr.push(new ElStyle("lineWidth", this.linewidth.toString()));
        el_repr.push(new ElStyle("strokeStyle", this.strokecolor));
        el_repr.push(new ElAction("stroke"));

        el_repr.push(new ElStyle("fillStyle", this.fillcolor));
        el_repr.push(new ElAction("fill"));
        return el_repr;
    }
}