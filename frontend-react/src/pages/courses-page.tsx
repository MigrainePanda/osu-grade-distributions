import { useContext } from "react";
import { InformationContext } from "../components/contexts/CourseContext.tsx"

function CoursesPage() {

    const res = useContext(InformationContext)
    console.log(res)

    const onClick = () => {
        res['setCourseName']("fsjfklsdjlf")
        // setCourseName("fsjfklsdjlf")
    }

    return (
        <>
            <h1 className="center-text">Course Selector</h1>
            <button onClick={onClick}>opoppopo</button>
        </>
    )
}

export default CoursesPage;