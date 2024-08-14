import YearSelector from "./YearSelector";
import TermSelector from "./TermSelector";

import "./Selectors.css";

function SelectorController() {

    return (
        <>
            <div className="top-selectors">
                <YearSelector />
                <TermSelector />
            </div>
        </>
    )
}

export default SelectorController;