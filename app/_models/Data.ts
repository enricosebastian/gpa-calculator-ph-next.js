import Action from "./Action";
import Course from "./Course";

export default interface Data {
    action: Action;
    new_course: Course | null;
};