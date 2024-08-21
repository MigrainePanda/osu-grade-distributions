import YearSelector from "./YearSelector";
import TermSelector from "./TermSelector";
import SubjectSelector from "./SubjectSelector";
import CourseSelector from "./CourseSelector";

import "./Selectors.css";

function SelectorController() {

    return (
        <>
            <div className="selectors-container">
                <SubjectSelector />
                <CourseSelector />
                <YearSelector />
                <TermSelector />
            </div>
        </>
    )
}

export default SelectorController;