import YearSelector from "./YearSelector";
import TermSelector from "./TermSelector";
import SubjectSelector from "./SubjectSelector";

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
        </>
    )
}

export default SelectorController;