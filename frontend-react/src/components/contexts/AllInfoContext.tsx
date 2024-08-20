import { createContext } from 'react';

export type InformationType = {
    isUpdated: boolean
    isFetched: boolean
    allYears: Array<object>
    allTerms: Array<object>
    allCourses: Array<object>
    allSubjects: Array<object>
    setIsUpdated: (c:boolean) => void
    setIsFetched: (c:boolean) => void
    setAllYears: (c:Array<object>) => void
    setAllTerms: (c:Array<object>) => void
    setAllCourses: (c:Array<object>) => void
    setAllSubjects: (c:Array<object>) => void
}

const AllInfoContext = createContext<InformationType>({
    isUpdated: false,
    isFetched: false,
    allYears: [{}],
    allTerms: [{}],
    allCourses: [{}],
    allSubjects: [{}],
    setIsUpdated: () => {},
    setIsFetched: () => {},
    setAllYears: () => {},
    setAllTerms: () => {},
    setAllCourses: () => {},
    setAllSubjects: () => {},
});

export { AllInfoContext };