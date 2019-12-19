import { EquilateralTriangleCreator } from "./canvas/elements/triangle/equilateral"
import { Point } from "./canvas/elements/point"
import { Canvas } from "./canvas/canvas"
import { Coordinates } from "./canvas/elements/coordinates"
import { EquiFigure, Figure, EquiFigureCreator } from "./canvas/elements/triangle/equi_angle"
import { Square } from "./canvas/elements/rectangle/square"
import { ElAction } from "./canvas/elements/element_repr"
import { MinkovskiCurve } from "./canvas/elements/fractals/minkovski_curve"
import { MinkovskiSausage } from "./canvas/elements/fractals/minkovski_sausage"
import { Parallelogram } from "./canvas/elements/parallelogram/parallelogram"

export function lab_1() {

function drawCanvas(field_descr: any) {
    let canvas = new Canvas("#mainCanvas1", 400, 400, "white");
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
}


export function lab_2() {
    function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function draw_sausage(step: number) {
    for (let i = 0; i <= step; i++) {
        fractal.step = i;
        await sleep(500);
    }
}

let steps = Number(prompt("Set number of steps", "6"));
let center_point = prompt("Set center of fractal 'x y'", "400 400");
let center = new Point(Number(center_point!.split(" ")[0]), Number(center_point!.split(" ")[1]));
let side = Math.min(center.x - 160, 800 - center.x, center.y - 160, 800 - center.y);

if (side < 0) {
    throw new Error("Please set center between 160 and 800");
}

let canvas_1 = new Canvas("#mainCanvas1", 800, 800, "white");
let canvas_2 = new Canvas("#mainCanvas2", 800, 800, "white");


let fractal = new MinkovskiSausage(
    new Point(center.x - side, center.y - side), 
    new Point(center.x + side, center.y + side), 0);

fractal.fill_color = "lawngreen";
fractal.line_width = 0;
canvas_1.add_draw_el(fractal);
canvas_2.add_draw_el(fractal);

fractal.subscribe(canvas_1, "draw_els");
fractal.subscribe(canvas_2, "draw_els");


draw_sausage(steps);

document.getElementById("decrease")!.onclick = () => {
    fractal.step = fractal.step - 1;
}

document.getElementById("increase")!.onclick = () => {
    fractal.step = fractal.step + 1;
}
}