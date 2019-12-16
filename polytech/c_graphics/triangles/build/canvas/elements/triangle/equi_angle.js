define(["require", "exports", "./equilateral", "../circle/circle", "../rectangle/square"], function (require, exports, equilateral_1, circle_1, square_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EquiFigureCreator {
        static fromEquilateral(base_triangle, figure_type = 3) {
            return new EquiFigure(figure_type, base_triangle.base_point, base_triangle.top_angle_shift);
        }
    }
    exports.EquiFigureCreator = EquiFigureCreator;
    class EquiFigure extends equilateral_1.EquilateralTriangle {
        constructor(figure_type, center, top_angle_shift) {
            super(center, top_angle_shift);
            this.setFigures(figure_type);
        }
        setFigures(figure_type) {
            switch (figure_type) {
                case 0:
                    this.top_figure = new circle_1.Circle(this.shift_top_angle, 4);
                    this.left_figure = new circle_1.Circle(this.shift_left_angle, 4);
                    this.right_figure = new circle_1.Circle(this.shift_right_angle, 4);
                    break;
                case 3:
                    this.top_figure = new circle_1.Circle(this.shift_top_angle, 0);
                    this.left_figure = new circle_1.Circle(this.shift_left_angle, 0);
                    this.right_figure = new circle_1.Circle(this.shift_right_angle, 0);
                    break;
                case 1:
                    this.top_figure = equilateral_1.EquilateralTriangleCreator.generateTriangleDirection(this.shift_top_angle, 4, 90);
                    this.left_figure = equilateral_1.EquilateralTriangleCreator.generateTriangleDirection(this.shift_left_angle, 4, 90);
                    this.right_figure = equilateral_1.EquilateralTriangleCreator.generateTriangleDirection(this.shift_right_angle, 4, 90);
                    break;
                case 2:
                    this.top_figure = square_1.SquareCreator.fromCenterSide(this.shift_top_angle, 4);
                    this.left_figure = square_1.SquareCreator.fromCenterSide(this.shift_left_angle, 4);
                    this.right_figure = square_1.SquareCreator.fromCenterSide(this.shift_right_angle, 4);
                    break;
            }
        }
        get __raw_el_repr() {
            let el_repr = super.__raw_el_repr;
            el_repr.push(...this.right_figure.el_repr);
            el_repr.push(...this.left_figure.el_repr);
            el_repr.push(...this.top_figure.el_repr);
            return el_repr;
        }
    }
    exports.EquiFigure = EquiFigure;
});
