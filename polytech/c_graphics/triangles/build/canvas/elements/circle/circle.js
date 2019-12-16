define(["require", "exports", "../element_repr", "../canvas_el"], function (require, exports, element_repr_1, canvas_el_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Circle extends canvas_el_1.CanvasElement {
        constructor(center, radius, fillcolor = "rgba(255, 255, 255, 0.5)", strokecolor = "black", linewidth = 1) {
            super();
            this.center = center;
            this.radius = radius;
            this.strokecolor = strokecolor;
            this.linewidth = linewidth;
            this.fillcolor = fillcolor;
        }
        get __raw_el_repr() {
            let el_repr = new Array();
            el_repr.push(new element_repr_1.ElAction("beginPath"));
            el_repr.push(new element_repr_1.ElAction("arc", [this.center.x, this.center.y, this.radius,
                0, 2 * Math.PI, false]));
            el_repr.push(new element_repr_1.ElStyle("fillStyle", this.fillcolor));
            el_repr.push(new element_repr_1.ElAction("fill"));
            el_repr.push(new element_repr_1.ElStyle("lineWidth", this.linewidth.toString()));
            el_repr.push(new element_repr_1.ElStyle("strokeStyle", this.strokecolor));
            el_repr.push(new element_repr_1.ElAction("stroke"));
            return el_repr;
        }
    }
    exports.Circle = Circle;
});
