import { EquilateralTriangle, EquilateralTriangleCreator } from "./equilateral"
import { ElRepr, ElAction, ElStyle } from "../element_repr"
import { CanvasElement } from "../canvas_el"
import { Point } from "../point"
import { Circle } from "../circle/circle"
import { SquareCreator } from "../rectangle/square"

export class EquiFigureCreator {
    static fromEquilateral(base_triangle: EquilateralTriangle, figure_type: Figure=Figure.default): EquiFigure {
        return new EquiFigure(figure_type, base_triangle.base_point, base_triangle.top_angle_shift);
    }
}

export const enum Figure {
    dot,
    triangle,
    rectangle,
    default
}

export class EquiFigure extends EquilateralTriangle {
    private top_figure: CanvasElement;
    private left_figure: CanvasElement;
    private right_figure: CanvasElement;

    constructor(figure_type: Figure, center: Point, top_angle_shift: Point) {
        super(center, top_angle_shift);
        this.setFigures(figure_type);
    }

    private setFigures(figure_type: Figure) {
        switch (figure_type) {
            case Figure.dot:
                this.top_figure = new Circle(this.shift_top_angle, 4);
                this.left_figure = new Circle(this.shift_left_angle, 4);
                this.right_figure = new Circle(this.shift_right_angle, 4);
            break;
            case Figure.default:
                this.top_figure = new Circle(this.shift_top_angle, 0);
                this.left_figure = new Circle(this.shift_left_angle, 0);
                this.right_figure = new Circle(this.shift_right_angle, 0);
            break;
            case Figure.triangle:
                this.top_figure = EquilateralTriangleCreator.generateTriangleDirection(
                    this.shift_top_angle, 4, 90
                );
                this.left_figure = EquilateralTriangleCreator.generateTriangleDirection(
                    this.shift_left_angle, 4, 90
                );
                this.right_figure = EquilateralTriangleCreator.generateTriangleDirection(
                    this.shift_right_angle, 4, 90
                );
            break;
            case Figure.rectangle:
                this.top_figure = SquareCreator.fromCenterSide(
                    this.shift_top_angle, 4
                );
                this.left_figure = SquareCreator.fromCenterSide(
                    this.shift_left_angle, 4
                );
                this.right_figure = SquareCreator.fromCenterSide(
                    this.shift_right_angle, 4
                );
            break;
        }
    }

    get __raw_el_repr(): ElRepr {
        let el_repr = super.__raw_el_repr;
        el_repr.push(...this.right_figure.el_repr);
        el_repr.push(...this.left_figure.el_repr);
        el_repr.push(...this.top_figure.el_repr);
        return el_repr;
    }
}