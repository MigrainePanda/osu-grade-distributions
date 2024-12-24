import "./css/home-page.css";

import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AllInfoContext } from "../components/contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../components/contexts/CurrInfoContext.tsx";

import LoadingSpinner from "../components/LoadingSpinner";
import SelectorController from "../components/selectors/SelectorController";
import CourseDescription from "../components/CourseDescription";
import PlotController from "../components/Plot/PlotController.tsx";

import * as fetchHelper from "../utils/fetchHelpers.tsx";
import * as conversions from "../utils/conversions.tsx";

function HomePage() {
    const [coursesArr, setCoursesArr] = useState<Array<object>>([]);
    const [ytDict, setYTDict] = useState<object>();
    const {
        setAllYears,
        setAllTerms,
        setAllCredits,
        setAllSubjects,
        setAllCourses,
        setAllYearsTerms,
        isFetched,
        setIsFetched,
        allCourses,
        allYearsTerms,
    } = useContext(AllInfoContext);
    const { currSubject, currCourse, currYear, currTerm } =
        useContext(CurrInfoContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Grade Distributions | Home";

        if (isFetched) {
            return;
        }

        fetchHelper.fetchData("/years").then((res) => {
            setAllYears(res);
        });
        fetchHelper.fetchData("/terms").then((res) => {
            setAllTerms(res);
        });
        fetchHelper.fetchData("/credits").then((res) => {
            setAllCredits(res);
        });
        fetchHelper.fetchData("/subjects").then((res) => {
            setAllSubjects(res);
        });
        fetchHelper.fetchData("/courses").then((res) => {
            setAllCourses(res);
        });
        fetchHelper.fetchData("/years-has-terms").then((res) => {
            setAllYearsTerms(res);
            const dict = conversions.getYearTermMap(res);
            setYTDict(dict);
        });
        setIsFetched(true);
    }, [
        setAllYears,
        setAllTerms,
        setAllCredits,
        setAllSubjects,
        setAllCourses,
        setAllYearsTerms,
        allYearsTerms,
        isFetched,
        setIsFetched,
    ]);

    useEffect(() => {
        if (ytDict === undefined || currSubject === "") {
            return;
        }

        const arr: Array<object> = [];
        for (const course of allCourses) {
            const courseLong = course["long_name"];
            if (courseLong !== currCourse) {
                continue;
            }

            const yt = ytDict[course["year_term_id"]];
            const year = yt["calendar_year"];
            const term = yt["term_number"];

            // year, term
            if (currYear === year && currTerm === term) {
                arr.push(course);
                continue;
            }

            // all years, all terms
            if (currYear === "All" && currTerm === "All") {
                arr.push(course);
                continue;
            }

            // all years, term
            if (currYear === "All" && currTerm === term) {
                arr.push(course);
                continue;
            }

            // year, all terms
            if (currYear === year && currTerm === "All") {
                arr.push(course);
                continue;
            }
        }

        setCoursesArr(arr);
    }, [currSubject, currCourse, currYear, currTerm, allCourses, ytDict]);

    if (!isFetched) {
        <>
            <div className="content-inner">
                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="home-title center-text">
                            Oregon State University
                        </h1>
                        <h2 className="home-subtitle center-text">
                            Grade Distributions
                        </h2>
                    </div>
                </div>

                <div className="separator"></div>
                <div className="separator"></div>

                <LoadingSpinner />
            </div>
        </>;
    }

    return (
        <>
            <div className="content-inner">
                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="home-title center-text">
                            Oregon State University
                        </h1>
                        <h2 className="home-subtitle center-text">
                            Grade Distributions
                        </h2>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <SelectorController />
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block course-info">
                    <div className="content-block-inner">
                        <CourseDescription courses={coursesArr} />
                    </div>
                </div>

                <div className="separator"></div>

                <PlotController coursesArr={coursesArr} />

                <div className="separator"></div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title">
                            Can&apos;t find what you&apos;re looking for?
                        </h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">
                                Send me a message.
                            </p>
                        </div>
                        <NavLink
                            to={"/contact"}
                            className={"page-action page-text"}
                        >
                            Contact Me
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
