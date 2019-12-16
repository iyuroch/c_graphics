define(["require", "exports", "../element_repr", "../canvas_el", "../point"], function (require, exports, element_repr_1, canvas_el_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SquareCreator {
        static fromCenterSide(center, side, angle = 90) {
            return new Square(new point_1.Point(center.x + side / 2, center.y + side / 2), new point_1.Point(center.x - side / 2, center.y - side / 2));
        }
    }
    exports.SquareCreator = SquareCreator;
    class Square extends canvas_el_1.CanvasElement {
        constructor(top_right, bot_left, fillcolor = "rgba(255, 255, 255, 0.5)", strokecolor = "black", linewidth = 1) {
            if (top_right.x < bot_left.x ||
                top_right.y < bot_left.y) {
                throw new Error("Your top_right should be to top and right of bot_left");
            }
            super();
            this.top_right = top_right;
            this.bot_left = bot_left;
            this.fillcolor = fillcolor;
            this.strokecolor = strokecolor;
            this.linewidth = linewidth;
        }
        get __raw_el_repr() {
            let top_left = new point_1.Point(this.bot_left.x, this.top_right.y);
            let bot_right = new point_1.Point(this.top_right.x, this.bot_left.y);
            let el_repr = new Array();
            el_repr.push(new element_repr_1.ElAction("beginPath"));
            el_repr.push(new element_repr_1.ElAction("moveTo", top_left.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", this.top_right.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", bot_right.into_array()));
            el_repr.push(new element_repr_1.ElAction("lineTo", this.bot_left.into_array()));
            el_repr.push(new element_repr_1.ElAction("closePath"));
            el_repr.push(new element_repr_1.ElStyle("lineWidth", this.linewidth.toString()));
            el_repr.push(new element_repr_1.ElStyle("strokeStyle", this.strokecolor));
            el_repr.push(new element_repr_1.ElAction("stroke"));
            el_repr.push(new element_repr_1.ElStyle("fillStyle", this.fillcolor));
            el_repr.push(new element_repr_1.ElAction("fill"));
            return el_repr;
        }
    }
    exports.Square = Square;
});
