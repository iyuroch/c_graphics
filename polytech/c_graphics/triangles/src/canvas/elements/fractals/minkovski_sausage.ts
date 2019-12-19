import { CanvasElement } from "../canvas_el"
import { Point } from "../point"
import { ElRepr, ElAction, ElStyle } from "../element_repr"
import { MinkovskiCurve } from "./minkovski_curve"

export class MinkovskiSausage extends CanvasElement {
    public stroke_color: string;
    public line_width: number;
    public fill_color: string;
    private __step: number;
    private bot_left: Point;
    private top_right: Point;

    constructor(bot_left: Point, 
        top_right: Point, 
        step: number = 3,
        stroke_color: string="black",
        line_width: number = 1,
        fill_color: string = "white"
        ) {
        super();

        if (bot_left.y > top_right.y ||
            bot_left.x > top_right.x) {
            throw new Error("Minkovski box should be formed from top left and botright")
        }
        
        this.bot_left = bot_left;
        this.top_right = top_right;
        this.step = step;
        this.stroke_color = stroke_color;
        this.line_width = line_width;
        this.fill_color = fill_color;
    }

    get top_left(): Point {
        return new Point(this.bot_left.x, this.top_right.y)
    }

    get bot_right(): Point {
        return new Point(this.top_right.x, this.bot_left.y)
    }

    get step(): number {
        return this.__step;
    }

    set step(step: number) {
        // runs out of memory
        if (step < 0) {
            throw new Error("Steps can be only real numbers");
        }
        if (step <= 7) {
            this.__step =  step;
            this.changed()
        }
    }

    private append_fractal(res: Array<Point>, a: Point, b: Point, step: number) {
        for (let el of MinkovskiCurve.get_fractal(a, b, step)) {
            res.push(el);
        }
    }

    private get_fractal(): Array<Point> {

        let res = [this.bot_left];
        this.append_fractal(res, this.bot_left, this.top_left, this.step);
        res.push(this.top_left);
        this.append_fractal(res, this.top_left, this.top_right, this.step);
        res.push(this.top_right);
        this.append_fractal(res, this.top_right, this.bot_right, this.step);
        res.push(this.bot_right);
        this.append_fractal(res, this.bot_right, this.bot_left, this.step);
        console.log(res.length);
        return res;
    }

    get __raw_el_repr(): ElRepr {
        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        el_repr.push(new ElAction("moveTo", this.bot_left.into_array()));
        for (let fr_point of this.get_fractal()) {
            el_repr.push(new ElAction("lineTo", fr_point.into_array()));
        }
        el_repr.push(new ElAction("closePath"));

        el_repr.push(new ElStyle("lineWidth", this.line_width.toString()));
        el_repr.push(new ElStyle("strokeStyle", this.stroke_color));
        el_repr.push(new ElAction("stroke"));

        el_repr.push(new ElStyle("fillStyle", this.fill_color))
        el_repr.push(new ElAction("fill"));


        // TODO: remove this - just for demo
        el_repr.push(new ElStyle("textBaseline", "middle"));
        el_repr.push(new ElStyle("textAlign", "center"));
        el_repr.push(new ElStyle("fillStyle", "black"));
        el_repr.push(new ElStyle("font", "48px serif"))
        el_repr.push(new ElAction("fillText", [
            `${this.step}`, (this.top_right.x + this.bot_left.x) / 2, 
            (this.top_right.y + this.bot_left.y) / 2
        ]));
        return el_repr;
    }
}