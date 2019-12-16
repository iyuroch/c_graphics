define(["require", "exports", "./elements/element_repr"], function (require, exports, element_repr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Canvas {
        constructor(selector, width = 500, height = 500, background = "#EEEEEE") {
            this.__canvas_draw_els = [];
            this.__canvas_dom_el = document.querySelector(`${selector}`);
            this.canvas = this.__canvas_dom_el.getContext("2d");
            this.canvas.translate(0.5, 0.5);
            this.canvas.rotate(45 * Math.PI / 180);
            this.width = width;
            this.height = height;
            this.background = background;
        }
        add_draw_el(new_el) {
            this.__canvas_draw_els.push(new_el);
        }
        rm_draw_el(el_idx) {
            this.__canvas_draw_els.splice(el_idx, 1);
        }
        draw_els() {
            for (let element of this.__canvas_draw_els) {
                for (const el of element.el_repr) {
                    if (el instanceof element_repr_1.ElAction) {
                        this.apply_action(el.name, el.args);
                    }
                    else {
                        this.apply_style(el.name, el.value);
                    }
                }
            }
        }
        clear() {
            this.canvas.clearRect(0, 0, this.width, this.height);
        }
        apply_style(attr, value) {
            this.canvas[attr] = value;
        }
        apply_action(action, action_arguments) {
            if (action_arguments === undefined) {
                action_arguments = [];
            }
            (this.canvas[action]).apply(this.canvas, action_arguments);
        }
        set background(fill_color) {
            this.canvas.fillStyle = fill_color;
            this.canvas.fillRect(0, 0, this.width, this.height);
        }
        get background() {
            return this.canvas.fillStyle;
        }
        set width(width) {
            this.__width = width;
            this.__canvas_dom_el.style.width = `${this.__width}px`;
            this.__canvas_dom_el.width = this.__width;
        }
        get width() {
            return this.__width;
        }
        set height(height) {
            this.__height = height;
            this.__canvas_dom_el.style.height = `${this.__height}px`;
            this.__canvas_dom_el.height = this.__height;
        }
        get height() {
            return this.__height;
        }
    }
    exports.Canvas = Canvas;
});
