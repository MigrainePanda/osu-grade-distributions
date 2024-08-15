import YearSelector from "./YearSelector";
import TermSelector from "./TermSelector";
import SubjectSelector from "./SubjectSelector";
import CourseSelector from "./CourseSelector";

import "./Selectors.css";

function SelectorController() {

    return (
        <>
            <div className="center-div">
                <YearSelector />
                <TermSelector />
            </div>

            <div className="center-div">
                <SubjectSelector />
            </div>

            <div className="center-div">
                <CourseSelector />
            </div>
        </>
    )
}

export default SelectorController;