define(["require", "exports", "../canvas_el", "../point", "../element_repr"], function (require, exports, canvas_el_1, point_1, element_repr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EquilateralTriangleCreator {
        static generateTriangleDirection(center, length, angle_degrees) {
            if (angle_degrees > 120 || angle_degrees < 60) {
                throw new Error("Angle of vector should be from 60 to 120");
            }
            let top_angle = new point_1.Point(length, 0).rotate(angle_degrees);
            top_angle.x += center.x;
            top_angle.y += center.y;
            return new EquilateralTriangle(center, top_angle);
        }
        static generateTrianglePoints(center, top_angle) {
            return new EquilateralTriangle(center, top_angle);
        }
    }
    exports.EquilateralTriangleCreator = EquilateralTriangleCreator;
    class EquilateralTriangle extends canvas_el_1.CanvasElement {
        constructor(center, top_angle_shift) {
            super();
            this.fill_style = "rgba(255, 255, 255, 0.5)";
            this.line_width = 1;
            this.line_style = "black";
            this.top_angle_shift = top_angle_shift;
            this.base_point = new point_1.Point(center.x, center.y);
            let based_top_x = top_angle_shift.x - this.base_point.x;
            let based_top_y = top_angle_shift.y - this.base_point.y;
            this.top_angle = new point_1.Point(based_top_x, based_top_y);
            if (this.top_angle.y < 0) {
                throw new Error("Top angle position is not valid. It should be on top of \
                            center position");
            }
            const angle_degrees = this.top_angle.get_angle();
            if (angle_degrees > 120 || angle_degrees < 60) {
                console.log(angle_degrees, this.top_angle);
                throw new Error("Angle of vector should be from 60 to 120");
            }
            this.left_angle = this.top_angle.rotate(120);
            this.right_angle = this.top_angle.rotate(240);
        }
        get shift_top_angle() { return this.top_angle.shift(this.base_point); }
        get shift_left_angle() { return this.left_angle.shift(this.base_point); }
        get shift_right_angle() { return this.right_angle.shift(this.base_point); }
        get __raw_el_repr() {
            let el_repr = new Array();
            el_repr.push(new element_repr_1.ElAction("beginPath"));
            el_repr.push(new element_repr_1.ElAction("moveTo", this.shift_top_angle.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", this.shift_left_angle.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", this.shift_right_angle.into_array()));
            el_repr.push(new element_repr_1.ElAction("closePath"));
            el_repr.push(new element_repr_1.ElStyle("lineWidth", String(this.line_width)));
            el_repr.push(new element_repr_1.ElStyle("strokeStyle", this.line_style));
            el_repr.push(new element_repr_1.ElAction("stroke"));
            el_repr.push(new element_repr_1.ElStyle("fillStyle", this.fill_style));
            el_repr.push(new element_repr_1.ElAction("fill"));
            return el_repr;
        }
        get angles() {
            let shifted_array = [this.top_angle.shift(this.base_point),
                this.left_angle.shift(this.base_point), this.right_angle.shift(this.base_point)];
            return shifted_array;
        }
    }
    exports.EquilateralTriangle = EquilateralTriangle;
});
