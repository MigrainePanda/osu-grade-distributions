import { createContext } from 'react';

export type InformationType = {
    isSplash: boolean
    isFetched: boolean
    allYears: Array<object>
    allTerms: Array<object>
    allCourses: Array<object>
    allSubjects: Array<object>
    setIsSplash: (c:boolean) => void
    setIsFetched: (c:boolean) => void
    setAllYears: (c:Array<object>) => void
    setAllTerms: (c:Array<object>) => void
    setAllCourses: (c:Array<object>) => void
    setAllSubjects: (c:Array<object>) => void
}

const AllInfoContext = createContext<InformationType>({
    isSplash: false,
    isFetched: false,
    allYears: [{}],
    allTerms: [{}],
    allCourses: [{}],
    allSubjects: [{}],
    setIsSplash: () => {},
    setIsFetched: () => {},
    setAllYears: () => {},
    setAllTerms: () => {},
    setAllCourses: () => {},
    setAllSubjects: () => {},
});

export { AllInfoContext };