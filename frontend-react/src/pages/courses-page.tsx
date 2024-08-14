// import { useContext } from "react";
// import { InformationContext } from "../components/contexts/CourseContext.tsx"

import SelectorController from "../components/selectors/SelectorController.tsx";

function CoursesPage() {

    return (
        <>
            <h1 className="center-text">Course Selector</h1>
            <SelectorController />
        </>
    )
}

export default CoursesPage;