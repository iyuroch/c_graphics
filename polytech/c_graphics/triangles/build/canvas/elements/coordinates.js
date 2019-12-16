define(["require", "exports", "./canvas_el", "./point", "./element_repr", "./circle/circle"], function (require, exports, canvas_el_1, point_1, element_repr_1, circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Coordinates extends canvas_el_1.CanvasElement {
        constructor(x_end, y_end, line_width = 1, color = "#000", marks = 10, mark_radius = 2) {
            super();
            this.basis = new point_1.Point(4, 4);
            this.x_end = x_end;
            this.y_end = y_end;
            this.line_width = line_width;
            this.color = color;
            this.marks = marks;
            this.mark_radius = mark_radius;
        }
        get __raw_el_repr() {
            let el_repr = new Array();
            el_repr.push(new element_repr_1.ElAction("beginPath"));
            el_repr.push(new element_repr_1.ElAction("moveTo", this.basis.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", [this.x_end, this.basis.y]));
            el_repr.push(new element_repr_1.ElAction("lineTo", [this.x_end - 10, this.basis.y + 5]));
            el_repr.push(new element_repr_1.ElAction("moveTo", this.basis.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", [this.basis.x, this.y_end]));
            el_repr.push(new element_repr_1.ElAction("lineTo", [this.basis.x + 5, this.y_end - 10]));
            el_repr.push(new element_repr_1.ElStyle("lineWidth", String(this.line_width)));
            el_repr.push(new element_repr_1.ElStyle("strokeStyle", this.color));
            el_repr.push(new element_repr_1.ElAction("stroke"));
            let step = this.x_end / this.marks;
            for (var i = 1; i < this.marks; i++) {
                let x_circle = new circle_1.Circle(new point_1.Point(step * i, this.basis.y), this.mark_radius, this.color);
                let y_circle = new circle_1.Circle(new point_1.Point(this.basis.x, step * i), this.mark_radius, this.color);
                el_repr.push(...x_circle.el_repr);
                el_repr.push(...y_circle.el_repr);
            }
            el_repr.push(new element_repr_1.ElStyle("font", "10px Comic Sans MS"));
            el_repr.push(new element_repr_1.ElStyle("fillStyle", "black"));
            el_repr.push(new element_repr_1.ElStyle("textAlign", "center"));
            el_repr.push(new element_repr_1.ElAction("fillText", ["y-axis", this.x_end / 2, this.basis.y + 10]));
            el_repr.push(new element_repr_1.ElStyle("font", "10px Comic Sans MS"));
            el_repr.push(new element_repr_1.ElStyle("fillStyle", "black"));
            el_repr.push(new element_repr_1.ElStyle("textAlign", "center"));
            el_repr.push(new element_repr_1.ElAction("translate", [this.basis.x + 10, this.y_end / 2]));
            el_repr.push(new element_repr_1.ElAction("rotate", [(-Math.PI / 2).toString()]));
            el_repr.push(new element_repr_1.ElAction("fillText", ["x-axis", 0, 0]));
            return el_repr;
        }
    }
    exports.Coordinates = Coordinates;
});
