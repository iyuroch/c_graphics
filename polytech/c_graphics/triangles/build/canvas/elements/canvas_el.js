define(["require", "exports", "./element_repr"], function (require, exports, element_repr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CanvasElement {
        get el_repr() {
            let raw_el_repr = this.__raw_el_repr;
            raw_el_repr.splice(0, 0, new element_repr_1.ElAction("save"));
            raw_el_repr.push(new element_repr_1.ElAction("restore"));
            return raw_el_repr;
        }
    }
    exports.CanvasElement = CanvasElement;
});
