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

import { lab_1, lab_2 } from "./functions"


let a_point = prompt("Set center of 1 point", "1 1");
let a_center = new Point(Number(a_point!.split(" ")[0]), Number(a_point!.split(" ")[1]));
let b_point = prompt("Set center of 2 point", "2 70");
let b_center = new Point(Number(b_point!.split(" ")[0]), Number(b_point!.split(" ")[1]));
let c_point = prompt("Set center of 3 point", "70 70");
let c_center = new Point(Number(c_point!.split(" ")[0]), Number(c_point!.split(" ")[1]));

let fill_color = prompt("Please input fill color", "green");

let parallelogram = new Parallelogram(a_center, b_center, c_center);
let canvas_1 = new Canvas("#mainCanvas1", 500, 500, "white");
canvas_1.canvas.translate(canvas_1.width / 2, canvas_1.height / 2);
canvas_1.add_draw_el(parallelogram);
parallelogram.subscribe(canvas_1, "draw_els");
parallelogram.fillcolor = fill_color!;

let ms = 200;
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function draw_parallelogram() {
    while (true) {
        parallelogram.rotate(-2);
        console.log(ms);
        await sleep(ms);
    }
}

draw_parallelogram();

document.getElementById("increase")!.onclick = () => {
    if (ms - 20 < 0) {
        ms = 0
    } else {
        ms -= 20;
    }
}

document.getElementById("decrease")!.onclick = () => {
    ms += 20;
}