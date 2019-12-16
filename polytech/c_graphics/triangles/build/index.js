define(["require", "exports", "./canvas/elements/triangle/equilateral", "./canvas/elements/point", "./canvas/canvas", "./canvas/elements/coordinates", "./canvas/elements/triangle/equi_angle", "./canvas/elements/element_repr"], function (require, exports, equilateral_1, point_1, canvas_1, coordinates_1, equi_angle_1, element_repr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawCanvas(field_descr) {
        let canvas = new canvas_1.Canvas("#mainCanvas", 400, 400, "white");
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
});
