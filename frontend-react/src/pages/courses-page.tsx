import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AllInfoContext } from "../components/contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../components/contexts/CurrInfoContext.tsx";

import LoadingSpinner from "../components/LoadingSpinner.tsx";
import SelectorController from "../components/selectors/SelectorController.tsx";
import CourseDescription from "../components/CourseDescription.tsx";
import PlotGrades from "../components/Plot/PlotGrades.tsx";
import PlotPassRate from "../components/Plot/PlotPassRate.tsx";
import PlotAvgGPA from "../components/Plot/PlotAvgGPA.tsx";
import PlotNumStudents from "../components/Plot/PlotNumStudents.tsx";

import "./css/courses-page.css";

const URL = "https://osu-grade-distributions-stg-22718fe09a22.herokuapp.com/";

function CoursesPage() {
    
    const [coursesArr, setCoursesArr] = useState<Array<object>>([]);
    const { 
        setAllYears, 
        setAllTerms, 
        setAllSubjects, 
        setAllCourses, 
        allCourses,
        isFetched, 
        setIsFetched,
    } = useContext(AllInfoContext);
    const { courseName, year, term } = useContext(CurrInfoContext);
    
    useEffect(() => {
        document.title = 'Grade Distributions | Courses';
        const loadPage = (async () => {    
            const yearsResponse = await fetch(URL + "api/years");
            const years = await yearsResponse.json();
            setAllYears(years);
            // console.log("Years received.", years);

            const termsResponse = await fetch(URL + "api/terms");
            const terms = await termsResponse.json();
            setAllTerms(terms);
            // console.log("Terms received.", terms);
            
            const subjectsResponse = await fetch(URL + "api/subjects");
            const subjects = await subjectsResponse.json();
            setAllSubjects(subjects);
            // console.log("Subjects received.", subjects);
            
            const coursesResponse = await fetch(URL + "api/courses");
            const courses = await coursesResponse.json();
            setAllCourses(courses);
            // console.log("Courses received.", courses);

            console.log("Years, terms, subjects, courses fetched.")
            setIsFetched(true);
        });

        if (!isFetched) {
            loadPage();
        }
    }, [isFetched, setIsFetched, setAllYears, setAllTerms, setAllSubjects, setAllCourses]);

    useEffect(() => {
        let arr: Array<object> = [];
        // term only
        if (term !== "All" && year === "All") {
            arr = allCourses.filter((course) => {
                if (courseName === course['short'] && term === course['term']) {
                    return true;
                }
                return false;
            });
            setCoursesArr(arr)
        }
        // term and year
        else if (term !== "All") {
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
        // year only
        else if (year !== "" && year !== "All") {
            arr = allCourses.filter((course) => {
                if (courseName === course['short'] && year === course['year']) {
                    return true;
                }
                return false;
            });
            setCoursesArr(arr)
        }
        // no filters
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

    if (!isFetched) {
        return (
            <>
                <div className="content-inner">

                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title page-title">Courses</h1>
                            <div className="content-block-text-container">
                                <p className="content-block-text page-text">Select the course you would like to view.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="content-block">
                        <div className="content-block-inner">
                            <LoadingSpinner />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="content-inner">

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title page-title">Courses</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">Select the course you would like to view.</p>
                        </div>
                    </div>
                </div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <SelectorController />
                    </div>
                </div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <CourseDescription courses={coursesArr} />
                    </div>
                </div>

                <div className="image-container grade-distribution-container">
                    <PlotGrades courses={coursesArr} />
                </div>
                <div className="image-container">
                    <PlotPassRate courses={coursesArr} />
                </div>
                <div className="image-container">
                    <PlotAvgGPA courses={coursesArr} />
                </div>
                <div className="image-container">
                    <PlotNumStudents courses={coursesArr} />
                </div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title page-title">Can&apos;t find what you&apos;re looking for?</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">Send me a message.</p>
                        </div>
                        <NavLink to={"/contact"} className={"page-action page-text"}>Contact Me</NavLink>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default CoursesPage;