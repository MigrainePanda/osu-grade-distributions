import { createContext } from 'react';

export type InformationType = {
    allYears: Array<object>
    allTerms: Array<object>
    allCourses: Array<object>
    allSubjects: Array<object>
    setAllYears: (c:Array<object>) => void
    setAllTerms: (c:Array<object>) => void
    setAllCourses: (c:Array<object>) => void
    setAllSubjects: (c:Array<object>) => void
}

const AllInfoContext = createContext<InformationType>({
    allYears: [{}],
    allTerms: [{}],
    allCourses: [{}],
    allSubjects: [{}],
    setAllYears: () => {},
    setAllTerms: () => {},
    setAllCourses: () => {},
    setAllSubjects: () => {},
});

export { AllInfoContext };