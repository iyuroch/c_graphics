// TODO: Implement object watchers
import { CanvasElement } from "./elements/canvas_el";
import { ElAction, ElStyle } from "./elements/element_repr";

export class Canvas {
    canvas: any;
    private __canvas_draw_els: CanvasElement[];
    private  __canvas_dom_el: any;
    private __width!: number;
    private __height!: number;

    constructor(selector: String, width=500, height=500, background="#EEEEEE") {
        this.__canvas_draw_els = [];
        this.__canvas_dom_el = document.querySelector(`${selector}`);
        this.canvas = this.__canvas_dom_el.getContext("2d");
        // half pixel hack to unblurr lines
        this.canvas.translate(0.5, 0.5);
        this.canvas.rotate(45 * Math.PI / 180);

        this.width = width;
        this.height = height;
        this.background = background;
    }

    add_draw_el(new_el: CanvasElement) {
        // TODO: add object change listener
        this.__canvas_draw_els.push(new_el);
    }

    rm_draw_el(el_idx: number) {
        // TODO: don't forget to upgrade object listener
        this.__canvas_draw_els.splice(el_idx, 1);
    }

    draw_els() {
        this.clear();
        
        for (let element of this.__canvas_draw_els) {
            for (const el of element.el_repr) {
                if (el instanceof ElAction) {
                    this.apply_action(el.name, el.args);
                } else {
                    this.apply_style(el.name, el.value);
                }
            }
        }
    }

    clear() {
        this.canvas.save();
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.restore();
    }

    apply_style(attr: string, value: string) {
        this.canvas[attr] = value;
    }

    apply_action(action: any, action_arguments?: any[]) {
        // this is used to dynamically draw single action on canvas
        // it does expect you to pass all possible arguments to draw function
        // after that we dynamically dispatch specific action on our context (canvas)
        // with all other arguments
        // this function does not provide any validation of input, so user
        // of this function is responsible for correct implementation
        
        if (action_arguments === undefined) {
            action_arguments = [];
        }

        // if (action === "moveTo" || action === "lineTo"


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
        this.__canvas_dom_el.style.width = `${this.__width}px`
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