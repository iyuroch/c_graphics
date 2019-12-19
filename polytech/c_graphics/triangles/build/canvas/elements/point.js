define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        shift(base) {
            return new Point(this.x + base.x, this.y + base.y);
        }
        clone() {
            return new Point(this.x, this.y);
        }
        into_array() {
            return [this.x, this.y];
        }
        add(other) {
            return new Point(this.x + other.x, this.y + other.y);
        }
        substract(other) {
            return new Point(this.x - other.x, this.y - other.y);
        }
        rotate(degrees) {
            degrees = ((degrees) % 360) * (Math.PI / 180);
            let rot_x = this.x * Math.cos(degrees) - this.y * Math.sin(degrees);
            let rot_y = this.x * Math.sin(degrees) + this.y * Math.cos(degrees);
            return new Point(rot_x, rot_y);
        }
        get_angle() {
            let angle = Math.atan(this.y / this.x) * 180 / Math.PI;
            if (this.x < 0 && this.y < 0) {
                return angle + 180;
            }
            else if (this.x < 0) {
                return angle + 180;
            }
            else if (this.y < 0) {
                return 270 + (90 + angle);
            }
            return angle % 360;
        }
    }
    exports.Point = Point;
});
