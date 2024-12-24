import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrInfoContext } from "./components/contexts/CurrInfoContext.tsx";
import { AllInfoContext } from "./components/contexts/AllInfoContext.tsx";
import { registerCharts } from "./components/Plot/registerCharts.tsx";
registerCharts();

import HomePage from "./pages/home-page.tsx";
import ContactPage from "./pages/contact-page.tsx";
import AboutPage from "./pages/about-page.tsx";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import SplashLoading from "./components/SplashLoading/SplashLoading.tsx";
import BackToTop from "./components/BackToTop/BackToTop";

function App() {
    const [isSplash, setIsSplash] = useState<boolean>(false);
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const [allYears, setAllYears] = useState<Array<object>>([]);
    const [allTerms, setAllTerms] = useState<Array<object>>([]);
    const [allCredits, setAllCredits] = useState<Array<object>>([]);
    const [allSubjects, setAllSubjects] = useState<Array<object>>([]);
    const [allCourses, setAllCourses] = useState<Array<object>>([]);
    const [allYearsTerms, setAllYearsTerms] = useState<Array<object>>([]);

    const allProp = {
        isSplash,
        isFetched,
        allYears,
        allTerms,
        allSubjects,
        allCredits,
        allCourses,
        allYearsTerms,
        setIsSplash,
        setIsFetched,
        setAllYears,
        setAllTerms,
        setAllCredits,
        setAllSubjects,
        setAllCourses,
        setAllYearsTerms,
    };

    const [currYear, setCurrYear] = useState<string>("");
    const [currTerm, setCurrTerm] = useState<string>("");
    const [currCourse, setCurrCourse] = useState<string>("");
    const [currSubject, setCurrSubject] = useState<string>("");
    const [currCoursesArr, setCurrCoursesArr] = useState<Array<object>>([]);

    const currProp = {
        currYear,
        currTerm,
        currCourse,
        currSubject,
        currCoursesArr,
        setCurrYear,
        setCurrTerm,
        setCurrCourse,
        setCurrSubject,
        setCurrCoursesArr,
    };

    return (
        <>
            <AllInfoContext.Provider value={allProp}>
                <CurrInfoContext.Provider value={currProp}>
                    <BrowserRouter>
                        <Header />
                        {!isSplash && <SplashLoading />}
                        <div className="content" id="content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/contact"
                                    element={<ContactPage />}
                                />
                                <Route path="/about" element={<AboutPage />} />
                            </Routes>
                        </div>
                        <Footer />
                        <BackToTop />
                    </BrowserRouter>
                </CurrInfoContext.Provider>
            </AllInfoContext.Provider>
        </>
    );
}

export default App;
