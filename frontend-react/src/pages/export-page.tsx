import { useContext } from "react";
import { InformationContext } from "../components/contexts/CourseContext.tsx"

function ExportPage() {

    const { courseName, setCourseName } = useContext(InformationContext)
    console.log(courseName)

    const onClick = () => {
        setCourseName("xcvcxvxcvxc")
    }

    return (
        <>
            <h1 className="center-text">Export</h1>
            <button onClick={onClick}>mnmnmnmnmn</button>
        </>
    )
}

export default ExportPage;