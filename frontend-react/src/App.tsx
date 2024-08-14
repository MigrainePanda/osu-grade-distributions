import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page.tsx";
import CoursesPage from "./pages/courses-page.tsx";
import ExportPage from "./pages/export-page.tsx";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

import { useState } from "react";
import { CurrInfoContext } from "./components/contexts/CurrInfoContext.tsx";
import { AllInfoContext } from "./components/contexts/AllInfoContext.tsx";

function App() {

  const [allCourses, setAllCourses] = useState<Array<object>>([]);
  const [allSubjects, setAllSubjects] = useState<Array<object>>([]);
  const [allYears, setAllYears] = useState<Array<object>>([]);
  const [allTerms, setAllTerms] = useState<Array<object>>([]);

  const allProp = {
    allYears,
    allTerms,
    allCourses,
    allSubjects,
    setAllYears,
    setAllTerms,
    setAllCourses,
    setAllSubjects,
  }

  const [courseName, setCourseName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [term, setTerm] = useState<string>("");

  const currProp = {
    year,
    term,
    courseName, 
    subjectName,
    setYear,
    setTerm,
    setCourseName,
    setSubjectName,
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
              <Route path="/export" element={<ExportPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
          
        </CurrInfoContext.Provider>
      </AllInfoContext.Provider>
    </>
  )
}

export default App
