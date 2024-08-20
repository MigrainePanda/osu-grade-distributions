import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrInfoContext } from "./components/contexts/CurrInfoContext.tsx";
import { AllInfoContext } from "./components/contexts/AllInfoContext.tsx";
import { registerCharts } from "./components/Plot/registerCharts.tsx";
registerCharts();

import HomePage from "./pages/home-page.tsx";
import CoursesPage from "./pages/courses-page.tsx";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";


function App() {

  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [allCourses, setAllCourses] = useState<Array<object>>([]);
  const [allSubjects, setAllSubjects] = useState<Array<object>>([]);
  const [allYears, setAllYears] = useState<Array<object>>([]);
  const [allTerms, setAllTerms] = useState<Array<object>>([]);

  const allProp = {
    isUpdated,
    isFetched,
    allYears,
    allTerms,
    allCourses,
    allSubjects,
    setIsUpdated,
    setIsFetched,
    setAllYears,
    setAllTerms,
    setAllCourses,
    setAllSubjects,
  }

  const [courseName, setCourseName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [coursesArr, setCoursesArr] = useState<Array<object>>([]);

  const currProp = {
    year,
    term,
    courseName, 
    subjectName,
    coursesArr,
    setYear,
    setTerm,
    setCourseName,
    setSubjectName,
    setCoursesArr,
  }

  return (
    <>
      <AllInfoContext.Provider value={allProp}>
        <CurrInfoContext.Provider value={currProp}>

          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
          
        </CurrInfoContext.Provider>
      </AllInfoContext.Provider>
    </>
  )
}

export default App
