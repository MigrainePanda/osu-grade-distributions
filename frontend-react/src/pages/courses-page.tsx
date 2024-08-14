import { useContext, useEffect } from "react";
import { AllInfoContext } from "../components/contexts/AllInfoContext.tsx"

import SelectorController from "../components/selectors/SelectorController.tsx";


const URL = import.meta.env.VITE_BACKEND_URL;

function CoursesPage() {
    const { setAllYears, setAllSubjects, setAllCourses } = useContext(AllInfoContext);

    const loadPage = (async () => {      
        const yearsResponse = await fetch(URL + "/years");
        const years = await yearsResponse.json();
        setAllYears(years);
        // console.log("Years received.", years);
        
        const subjectsResponse = await fetch(URL + "/subjects");
        const subjects = await subjectsResponse.json();
        setAllSubjects(subjects);
        // console.log("Subjects received.", subjects);
        
        const coursesResponse = await fetch(URL + "/courses");
        const courses = await coursesResponse.json();
        setAllCourses(courses);
        // console.log("Courses received.", courses);
    })
    
    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
            <h1 className="center-text">Course Selector</h1>
            <SelectorController />
        </>
    )
}

export default CoursesPage;