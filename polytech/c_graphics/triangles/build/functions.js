var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./canvas/elements/triangle/equilateral", "./canvas/elements/point", "./canvas/canvas", "./canvas/elements/coordinates", "./canvas/elements/triangle/equi_angle", "./canvas/elements/element_repr", "./canvas/elements/fractals/minkovski_sausage"], function (require, exports, equilateral_1, point_1, canvas_3, coordinates_1, equi_angle_1, element_repr_1, minkovski_sausage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lab_1() {
        function drawCanvas(field_descr) {
            let canvas = new canvas_3.Canvas("#mainCanvas1", 400, 400, "white");
            let coordinates = new coordinates_1.Coordinates(canvas.width / field_descr.single_segment, canvas.height / field_descr.single_segment);
            canvas.canvas.scale(field_descr.single_segment, field_descr.single_segment);
            canvas.add_draw_el(coordinates);
            for (const el of field_descr.triangles) {
                let triangle = equilateral_1.EquilateralTriangleCreator.generateTriangleDirection(new point_1.Point(el.center[0], el.center[1]), el.length, el.direction);
                let figure;
                switch (el.figure) {
                    case "triangle": {
                        figure = 1;
                        break;
                    }
                    case "rectangle": {
                        figure = 2;
                        break;
                    }
                    case "dot": {
                        figure = 0;
                        break;
                    }
                    default: {
                        figure = 3;
                        break;
                    }
                }
                triangle = equi_angle_1.EquiFigureCreator.fromEquilateral(triangle, figure);
                triangle.fill_style = el.fillcolor;
                triangle.line_style = el.line_style;
                for (const el_repr of triangle.el_repr) {
                    if (el_repr instanceof element_repr_1.ElAction) {
                        if (el_repr.name === "moveTo" ||
                            el_repr.name === "lineTo") {
                            if (el_repr.args[0] > canvas.width / field_descr.single_segment ||
                                el_repr.args[1] > canvas.height / field_descr.single_segment) {
                                throw new Error(`Your element ${JSON.stringify(el)} is out of canvas`);
                            }
                        }
                    }
                }
                canvas.add_draw_el(triangle);
            }
            canvas.draw_els();
        }
        let url = './field.json';
        fetch(url)
            .then(res => res.json())
            .then((out) => {
            drawCanvas(out);
        })
            .catch(err => { throw err; });
    }
    exports.lab_1 = lab_1;
    function lab_2() {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        function draw_sausage(step) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i <= step; i++) {
                    fractal.step = i;
                    yield sleep(500);
                }
            });
        }
        let steps = Number(prompt("Set number of steps", "6"));
        let center_point = prompt("Set center of fractal 'x y'", "400 400");
        let center = new point_1.Point(Number(center_point.split(" ")[0]), Number(center_point.split(" ")[1]));
        let side = Math.min(center.x - 160, 800 - center.x, center.y - 160, 800 - center.y);
        if (side < 0) {
            throw new Error("Please set center between 160 and 800");
        }
        let canvas_1 = new canvas_3.Canvas("#mainCanvas1", 800, 800, "white");
        let canvas_2 = new canvas_3.Canvas("#mainCanvas2", 800, 800, "white");
        let fractal = new minkovski_sausage_1.MinkovskiSausage(new point_1.Point(center.x - side, center.y - side), new point_1.Point(center.x + side, center.y + side), 0);
        fractal.fill_color = "lawngreen";
        fractal.line_width = 0;
        canvas_1.add_draw_el(fractal);
        canvas_2.add_draw_el(fractal);
        fractal.subscribe(canvas_1, "draw_els");
        fractal.subscribe(canvas_2, "draw_els");
        draw_sausage(steps);
        document.getElementById("decrease").onclick = () => {
            fractal.step = fractal.step - 1;
        };
        document.getElementById("increase").onclick = () => {
            fractal.step = fractal.step + 1;
        };
    }
    exports.lab_2 = lab_2;
});
