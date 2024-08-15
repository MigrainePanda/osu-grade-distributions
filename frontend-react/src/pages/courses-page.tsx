import { useState, useContext, useEffect } from "react";
import { AllInfoContext } from "../components/contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../components/contexts/CurrInfoContext.tsx";

import SelectorController from "../components/selectors/SelectorController.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import PlotGrades from "../components/Plot/PlotGrades.tsx";

import "./css/courses-page.css";

const URL = import.meta.env.VITE_BACKEND_URL;

function CoursesPage() {
    const [fetched, setFetched] = useState<boolean>(false);
    const [coursesArr, setCoursesArr] = useState<Array<object>>([]);
    const { setAllYears, setAllTerms, setAllSubjects, setAllCourses, allCourses } = useContext(AllInfoContext);
    const { courseName, year, term } = useContext(CurrInfoContext);
    
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

            setFetched(true);
        })

        loadPage();
    }, [setAllYears, setAllTerms, setAllSubjects, setAllCourses]);

    useEffect(() => {
        let arr: Array<object> = [];
        if (term !== "N/A" && term !== "All") {
            arr = allCourses.filter((course) => {
                if (courseName === course['short'] && 
                    year === course['year'] &&
                    term === course['term']) {
                        return true;
                    }
                return false;
            });
            setCoursesArr(arr)
        }
        else if (year !== "" && year !== "All") {
            arr = allCourses.filter((course) => {
                if (courseName === course['short'] && 
                    year === course['year']) {
                        return true;
                    }
                return false;
            });
            setCoursesArr(arr)
        }
        else {
            arr = allCourses.filter((course) => {
                if (courseName === course['short']) {
                        return true;
                    }
                return false;
            });
            setCoursesArr(arr);
        }
    }, [allCourses, courseName, year, term]);

    return (
        <>
            <h1 className="center-text">Course Selector</h1>
            {fetched ? <SelectorController /> : <LoadingSpinner />}
            {courseName !== "" 
                ? 
                    <div className="center-div">
                        <div className="image-container">
                            <PlotGrades courses={coursesArr} />
                        </div>
                    </div>
                : 
                    <div className="center-div image-loading-container">
                        <LoadingSpinner />
                    </div>
            }
        </>
    )
}

export default CoursesPage;