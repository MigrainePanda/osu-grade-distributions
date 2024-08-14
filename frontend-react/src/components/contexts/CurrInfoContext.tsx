import { createContext } from 'react';

export type InformationType = {
  year: string
  term: string
  courseName: string
  subjectName: string
  setYear: (c: string) => void
  setTerm: (c: string) => void
  setCourseName: (c: string) => void
  setSubjectName: (c: string) => void
}

const CurrInfoContext = createContext<InformationType>({
  year: "All",
  term: "N/A",
  courseName: "None",
  subjectName: "None",
  setYear: () => {},
  setTerm: () => {},
  setCourseName: () => {},
  setSubjectName: () => {},
});

export { CurrInfoContext };