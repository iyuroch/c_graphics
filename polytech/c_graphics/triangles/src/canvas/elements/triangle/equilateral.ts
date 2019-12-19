import { CanvasElement } from "../canvas_el"
import { Point } from "../point"
import { ElRepr, ElAction, ElStyle } from "../element_repr"

export class EquilateralTriangleCreator {
    static generateTriangleDirection(center: Point, length: number, angle_degrees: number) {
        if ( angle_degrees > 120 || angle_degrees < 60) {
            throw new Error("Angle of vector should be from 60 to 120");
        }
        let top_angle = new Point(length, 0).rotate(angle_degrees);
        top_angle.x += center.x;
        top_angle.y += center.y;

        return new EquilateralTriangle(center, top_angle);
    }

    static generateTrianglePoints(center: Point, top_angle: Point): EquilateralTriangle {
        return new EquilateralTriangle(center, top_angle);
    }
}

// an element shold extends CanvasElement so that we know
// it does have method to draw on canvas
export class EquilateralTriangle extends CanvasElement {
    readonly base_point: Point;
    readonly top_angle_shift: Point;
    protected top_angle: Point;
    protected left_angle: Point;
    protected right_angle: Point;

    public line_width: number;
    public line_style: string;
    public fill_style: string;

    get shift_top_angle() {return this.top_angle.shift(this.base_point)}
    get shift_left_angle() {return this.left_angle.shift(this.base_point)}
    get shift_right_angle() {return this.right_angle.shift(this.base_point)}

    constructor(center: Point, top_angle_shift: Point) {
        super();
        // TODO: make ascii art for triangle
        //   *
        //  .*.
        // .....
        // having center and bases we can find catets of triangle
        // and that's exactly what we want

        // we need to check for shifted and work in 0, 0 base system
        // that's why we find the base shift and merely work with all angles
        // in 0,0 base system
        // and append shift on return for representation

        // we restrict user to use angles from -33.33 to 33.33
        // as all other triangles can derive from these restrictions
        // and it eases logic for user and for us as we have determinate
        // behavior

        // TODO: test if 2 points collapse

        this.fill_style= "rgba(255, 255, 255, 0.5)";
        this.line_width = 1;
        this.line_style = "black";
        this.top_angle_shift = top_angle_shift;

        this.base_point = new Point(center.x, center.y);

        let based_top_x = top_angle_shift.x - this.base_point.x;
        let based_top_y = top_angle_shift.y - this.base_point.y;
        this.top_angle = new Point(based_top_x, based_top_y);

        if (this.top_angle.y < 0) {
            throw new Error("Top angle position is not valid. It should be on top of \
                            center position");
        }

        const angle_degrees = this.top_angle.get_angle();
        
        if ( angle_degrees > 120 || angle_degrees < 60) {
            console.log(angle_degrees, this.top_angle);
            throw new Error("Angle of vector should be from 60 to 120");
        }

        this.left_angle = this.top_angle.rotate(120);
        this.right_angle = this.top_angle.rotate(240);
    }

    get __raw_el_repr(): ElRepr {
        let el_repr = new Array();
        el_repr.push(new ElAction("beginPath"));
        el_repr.push(new ElAction("moveTo", this.shift_top_angle.into_array()));
        el_repr.push(new ElAction("lineTo", this.shift_left_angle.into_array()));
        el_repr.push(new ElAction("lineTo", this.shift_right_angle.into_array()));
        el_repr.push(new ElAction("closePath"));

        el_repr.push(new ElStyle("lineWidth", String(this.line_width)));
        el_repr.push(new ElStyle("strokeStyle", this.line_style));
        el_repr.push(new ElAction("stroke"));

        el_repr.push(new ElStyle("fillStyle", this.fill_style));
        el_repr.push(new ElAction("fill"));

        return el_repr;
    }

    get angles(): ReadonlyArray<Point> {        
        let shifted_array: Array<Point> = [this.top_angle.shift(this.base_point),
            this.left_angle.shift(this.base_point), this.right_angle.shift(this.base_point)];

        return shifted_array;
    }

    
}
