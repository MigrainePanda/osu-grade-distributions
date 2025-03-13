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
        isFetched,
        setIsFetched,
        setAllYears,
        setAllTerms,
        setAllCredits,
        setAllSubjects,
        setAllYearsTerms,
        setAllCourses,
    } = useContext(AllInfoContext);
    const { currSubject, currYear, currTerm } = useContext(CurrInfoContext);

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
        fetchHelper.fetchData("/years-has-terms").then((res) => {
            setAllYearsTerms(res);
            const dict = conversions.getYearTermMap(res);
            setYTDict(dict);
        });
        setIsFetched(true);
    }, [
        setIsFetched,
        setAllYears,
        setAllTerms,
        setAllCredits,
        setAllSubjects,
        setAllYearsTerms,
        isFetched,
    ]);

    useEffect(() => {
        if (ytDict === undefined || currSubject === "") {
            return;
        }
        const arr: Array<object> = [];
        let url = "/courses";
        url += "?subject=" + currSubject;
        url += "&term=" + currTerm;
        url += "&year=" + currYear;
        fetchHelper.fetchData(url).then((res) => {
            console.log(res);
            setAllCourses(res);
            for (const course of res) {
                arr.push(course);
            }
        });
        setCoursesArr(arr);
    }, [currSubject, currYear, currTerm, setAllCourses, ytDict]);

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
