import { CanvasElement } from "../canvas_el"
import { Point } from "../point"
import { ElRepr, ElAction, ElStyle } from "../element_repr"

export class MinkovskiCurve extends CanvasElement {
    public stroke_color: string;
    public line_width: number;
    private start: Point;
    private end: Point;
    private __step: number;

    constructor(start: Point, end: Point, step: number=5,
        stroke_color: string="black",
        line_width: number=1
        ) {
        super();
        
        this.start = start;
        this.end = end;
        this.step = step;
        this.stroke_color = stroke_color;
        this.line_width = line_width;
    }

    get step(): number {
        return this.__step;
    }

    set step(step: number) {
        this.__step = step;
    }

    static get_fractal(a: Point, i: Point, step: number): Array<Point> {
        //     #     c---d
        //     #     |   |
        //     #     |   |
        //     #     |   |
        //     # a---b   e   h---i
        //     #         |   |
        //     #         |   |
        //     #         |   |
        //     #         f---g

        if (step === 0) {
            return [];
        }

        const [x_step, y_step] = [(i.x - a.x) / 4, (i.y - a.y) / 4];

        let b = new Point(a.x + x_step * 1, a.y + y_step * 1);
        let c = new Point(
                b.x + y_step,
                b.y - x_step
            );
        let d = new Point(c.x + x_step, c.y + y_step);
        let e = new Point(a.x + x_step * 2, a.y + y_step * 2);
        let f = new Point(
                e.x - y_step,
                e.y + x_step
            );
        let g = new Point(f.x + x_step, f.y + y_step);
        let h = new Point(a.x + x_step * 3, a.y + y_step * 3);

        let curr_points = [a, b, c, d, e, f, g, h, i];
        let point_arr = [];

        step -= 1

        for (let i = 1; i < curr_points.length; i++) {
            // spread operator is bad choice here as range
            // exceeds
            for (let el of MinkovskiCurve.get_fractal(
                curr_points[i - 1], curr_points[i], step
                )) {
                point_arr.push(el);
            }
            point_arr.push(curr_points[i]);
        }
        point_arr.pop();

        return point_arr
    }

    private get_fractal(): Array<Point> {

        let res = [this.start];
        for (let el of MinkovskiCurve.get_fractal(
            this.start, this.end, this.step
                )) {
            res.push(el);
        }
        res.push(this.end);

        return res;
    }

    get __raw_el_repr(): ElRepr {
        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        el_repr.push(new ElAction("moveTo", this.start.into_array()));
        for (let fr_point of this.get_fractal()) {
            el_repr.push(new ElAction("lineTo", fr_point.into_array()));
        }

        el_repr.push(new ElStyle("lineWidth", this.line_width.toString()));
        el_repr.push(new ElStyle("strokeStyle", this.stroke_color));
        el_repr.push(new ElAction("stroke"));

        return el_repr;
    }
}