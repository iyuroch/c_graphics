var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./canvas/elements/point", "./canvas/canvas", "./canvas/elements/parallelogram/parallelogram"], function (require, exports, point_1, canvas_2, parallelogram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let a_point = prompt("Set center of 1 point", "1 1");
    let a_center = new point_1.Point(Number(a_point.split(" ")[0]), Number(a_point.split(" ")[1]));
    let b_point = prompt("Set center of 2 point", "2 70");
    let b_center = new point_1.Point(Number(b_point.split(" ")[0]), Number(b_point.split(" ")[1]));
    let c_point = prompt("Set center of 3 point", "70 70");
    let c_center = new point_1.Point(Number(c_point.split(" ")[0]), Number(c_point.split(" ")[1]));
    let fill_color = prompt("Please input fill color", "green");
    let parallelogram = new parallelogram_1.Parallelogram(a_center, b_center, c_center);
    let canvas_1 = new canvas_2.Canvas("#mainCanvas1", 500, 500, "white");
    canvas_1.canvas.translate(canvas_1.width / 2, canvas_1.height / 2);
    canvas_1.add_draw_el(parallelogram);
    parallelogram.subscribe(canvas_1, "draw_els");
    parallelogram.fillcolor = fill_color;
    let ms = 200;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function draw_parallelogram() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                parallelogram.rotate(-2);
                console.log(ms);
                yield sleep(ms);
            }
        });
    }
    draw_parallelogram();
    document.getElementById("increase").onclick = () => {
        if (ms - 20 < 0) {
            ms = 0;
        }
        else {
            ms -= 20;
        }
    };
    document.getElementById("decrease").onclick = () => {
        ms += 20;
    };
});
