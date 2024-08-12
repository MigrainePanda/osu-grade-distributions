import { createContext } from 'react';

export type InformationType = {
  courseName: string
  setCourseName: (c: string) => void
  subjectName: string
  setSubjectName: (c: string) => void
  year: string
  setYear(string)
  term: string
  setTerm: (c: string) => void
}

const InformationContext = createContext<InformationType>({
  courseName: "None",
  setCourseName: () => {},
  subjectName: "None",
  setSubjectName: () => {},
  year: "All",
  setYear: () => {},
  term: "N/A",
  setTerm: () => {},
});

export { InformationContext };