var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../canvas_el", "../point", "../element_repr"], function (require, exports, canvas_el_1, point_1, element_repr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Coordinates = (function (_super) {
        __extends(Coordinates, _super);
        function Coordinates(x_end, y_end, line_width, color) {
            if (line_width === void 0) { line_width = 1; }
            if (color === void 0) { color = "#000"; }
            var _this = _super.call(this) || this;
            _this.basis = new point_1.Point(1, 1);
            _this.x_end = x_end;
            _this.y_end = y_end;
            _this.line_width = line_width;
            _this.color = color;
            return _this;
        }
        Object.defineProperty(Coordinates.prototype, "__raw_el_repr", {
            get: function () {
                var el_repr = new Array();
                el_repr.push(new element_repr_1.ElAction("beginPath"));
                el_repr.push(new element_repr_1.ElAction("moveTo"), this.basis.into_array);
                el_repr.push(new element_repr_1.ElAction("lineTo"), [this.x_end, this.basis.y]);
                el_repr.push(new element_repr_1.ElAction("moveTo"), this.basis.into_array);
                el_repr.push(new element_repr_1.ElAction("lineTo"), [this.basis.x, this.y_end]);
                el_repr.push(new element_repr_1.ElStyle("lineWidth", String(this.line_width)));
                el_repr.push(new element_repr_1.ElStyle("strokeStyle", this.color));
                el_repr.push(new element_repr_1.ElAction("stroke"));
                return el_repr;
            },
            enumerable: true,
            configurable: true
        });
        return Coordinates;
    }(canvas_el_1.CanvasElement));
    exports.Coordinates = Coordinates;
});
