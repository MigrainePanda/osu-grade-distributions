import { createContext } from 'react';

export type InformationType = {
  year: string
  term: string
  courseName: string
  subjectName: string
  coursesArr: Array<object>
  setYear: (c: string) => void
  setTerm: (c: string) => void
  setCourseName: (c: string) => void
  setSubjectName: (c: string) => void
  setCoursesArr: (c:Array<object>) => void
}

const CurrInfoContext = createContext<InformationType>({
  year: "All",
  term: "N/A",
  courseName: "None",
  subjectName: "None",
  coursesArr: [{}],
  setYear: () => {},
  setTerm: () => {},
  setCourseName: () => {},
  setSubjectName: () => {},
  setCoursesArr: () => {},
});

export { CurrInfoContext };