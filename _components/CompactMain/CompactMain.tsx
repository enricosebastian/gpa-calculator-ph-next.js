import { Orientation } from "@/_types/Enums";
import { RetroDiv, RetroDivSubComponent, RetroDivButton } from "../RetroDiv/RetroDiv";
import RetroDropdown from "../RetroDropdown/RetroDropdown";


export default function CompactMain() {

    return (
        <RetroDiv>
            <RetroDivSubComponent orientation={Orientation.TOP}>
                <RetroDropdown><option>dlsu_gpa</option></RetroDropdown>
            </RetroDivSubComponent>

            <RetroDivSubComponent orientation={Orientation.BOTTOM}>
                <RetroDropdown><option>term_1</option></RetroDropdown>
            </RetroDivSubComponent>


            <RetroDivButton orientation={Orientation.BOTTOM_LEFT}>+</RetroDivButton>
            <RetroDivButton orientation={Orientation.BOTTOM_RIGHT}>x</RetroDivButton>
        </RetroDiv>
    );

}

function RetroDivCourses() {

}