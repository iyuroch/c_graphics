import { EquilateralTriangleCreator } from "./canvas/elements/triangle/equilateral"
import { Point } from "./canvas/elements/point"
import { Canvas } from "./canvas/canvas"
import { Coordinates } from "./canvas/elements/coordinates"
import { EquiFigure, Figure, EquiFigureCreator } from "./canvas/elements/triangle/equi_angle"
import { Square } from "./canvas/elements/rectangle/square"
import { ElAction } from "./canvas/elements/element_repr"


function drawCanvas(field_descr: any) {
    let canvas = new Canvas("#mainCanvas", 400, 400, "white");
    let coordinates = new Coordinates(
        canvas.width / field_descr.single_segment, canvas.height / field_descr.single_segment
    );

    canvas.canvas.scale(field_descr.single_segment, field_descr.single_segment);
    canvas.add_draw_el(coordinates);

    for (const el of field_descr.triangles) {
        let triangle = EquilateralTriangleCreator.generateTriangleDirection(
            new Point(el.center[0], el.center[1]),
            el.length,
            el.direction
        )

        let figure: Figure;
        switch(el.figure) { 
            case "triangle": { 
                figure = Figure.triangle;
                break; 
            }
            case "rectangle": { 
                figure = Figure.rectangle;
                break; 
            }
            case "dot": { 
                figure = Figure.dot;
                break; 
            } 
            default: { 
                figure = Figure.default; 
                break; 
            } 
        } 
        triangle = EquiFigureCreator.fromEquilateral(triangle, figure);
        triangle.fill_style = el.fillcolor;
        triangle.line_style = el.line_style;

        // due to tech requirements we need to notify user
        // that his elements are our of canvas
        for (const el_repr of triangle.el_repr) {
            if (el_repr instanceof ElAction) {
                if (el_repr.name === "moveTo" ||
                el_repr.name === "lineTo") {
                        if (el_repr.args![0] > canvas.width / field_descr.single_segment ||
                            el_repr.args![1] > canvas.height / field_descr.single_segment) {
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
    .catch(err => { throw err });
