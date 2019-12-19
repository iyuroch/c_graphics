export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y
    }

    shift(base: Point): Point {
        return new Point(this.x + base.x, this.y + base.y);
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    into_array(): Array<number> {
        return [this.x, this.y];
    }

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    substract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    rotate(degrees: number): Point {
        // It assumes bases to be on 0, 0
        degrees = ((degrees) % 360) * (Math.PI / 180);

        let rot_x = this.x * Math.cos(degrees) - this.y * Math.sin(degrees);
        let rot_y = this.x * Math.sin(degrees) + this.y * Math.cos(degrees);
        return new Point(rot_x, rot_y);
    }

    get_angle(): number {
        // this should be to base 0, 0
        // we will work in degrees
        let angle = Math.atan(this.y / this.x) * 180 / Math.PI

        if (this.x < 0 && this.y < 0) {
            return angle + 180;
        } else if (this.x < 0) {
            return angle + 180;
        } else if (this.y < 0) {
            return 270 + (90 + angle);
        }
        return angle % 360;
    }
}