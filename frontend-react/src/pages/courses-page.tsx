import { useContext, useEffect } from "react";
import { AllInfoContext } from "../components/contexts/AllInfoContext.tsx"

import SelectorController from "../components/selectors/SelectorController.tsx";


const URL = import.meta.env.VITE_BACKEND_URL;

function CoursesPage() {
    const { setAllYears, setAllTerms, setAllSubjects, setAllCourses } = useContext(AllInfoContext);
    
    useEffect(() => {
        const loadPage = (async () => {      
            const yearsResponse = await fetch(URL + "/years");
            const years = await yearsResponse.json();
            setAllYears(years);
            // console.log("Years received.", years);

            const termsResponse = await fetch(URL + "/terms");
            const terms = await termsResponse.json();
            setAllTerms(terms);
            // console.log("Terms received.", terms);
            
            const subjectsResponse = await fetch(URL + "/subjects");
            const subjects = await subjectsResponse.json();
            setAllSubjects(subjects);
            // console.log("Subjects received.", subjects);
            
            const coursesResponse = await fetch(URL + "/courses");
            const courses = await coursesResponse.json();
            setAllCourses(courses);
            // console.log("Courses received.", courses);
        })

        loadPage();
    }, [setAllYears, setAllTerms, setAllSubjects, setAllCourses]);

    return (
        <>
            <h1 className="center-text">Course Selector</h1>
            <SelectorController />
        </>
    )
}

export default CoursesPage;