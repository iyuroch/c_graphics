// TODO: implement decorator to null styles
// in el_repr so that next element for sure should set his own
// TODO: implement check if raw_el_repr changed from previous time
// and do not recalculate element repr if not changed
import { ElRepr, ElAction } from "./element_repr";

export abstract class CanvasElement {
    abstract get __raw_el_repr(): ElRepr;
    get el_repr(): ElRepr {
        let raw_el_repr = this.__raw_el_repr;
        raw_el_repr.splice(0, 0, new ElAction("save"));
        raw_el_repr.push(new ElAction("restore"));
        return raw_el_repr;
    }
}