define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ElStyle {
        constructor(name, value) {
            this.name = name;
            this.value = value;
        }
    }
    exports.ElStyle = ElStyle;
    class ElAction {
        constructor(name, args) {
            this.name = name;
            if (args !== undefined) {
                this.args = args;
            }
        }
    }
    exports.ElAction = ElAction;
});
