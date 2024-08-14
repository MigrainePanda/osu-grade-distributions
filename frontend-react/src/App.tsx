import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page.tsx";
import CoursesPage from "./pages/courses-page.tsx";
import ExportPage from "./pages/export-page.tsx";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

import { useState } from "react";
import { InformationContext } from "./components/contexts/CourseContext.tsx"

function App() {

  const [courseName, setCourseName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [term, setTerm] = useState<string>("");

  const props = {
    courseName, 
    setCourseName,
    subjectName,
    setSubjectName,
    year,
    setYear,
    term,
    setTerm,
  }

  return (
    <>
      <InformationContext.Provider value={props}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/export" element={<ExportPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </InformationContext.Provider>
    </>
  )
}

export default App
