import { createContext } from "react";

export type InformationType = {
    isSplash: boolean;
    isFetched: boolean;
    allYears: Array<object>;
    allTerms: Array<object>;
    allCredits: Array<object>;
    allSubjects: Array<object>;
    allCourses: Array<object>;
    allYearsTerms: Array<object>;
    setIsSplash: (c: boolean) => void;
    setIsFetched: (c: boolean) => void;
    setAllYears: (c: Array<object>) => void;
    setAllTerms: (c: Array<object>) => void;
    setAllCredits: (c: Array<object>) => void;
    setAllSubjects: (c: Array<object>) => void;
    setAllCourses: (c: Array<object>) => void;
    setAllYearsTerms: (c: Array<object>) => void;
};

const AllInfoContext = createContext<InformationType>({
    isSplash: false,
    isFetched: false,
    allYears: [{}],
    allTerms: [{}],
    allCredits: [{}],
    allSubjects: [{}],
    allCourses: [{}],
    allYearsTerms: [{}],
    setIsSplash: () => {},
    setIsFetched: () => {},
    setAllYears: () => {},
    setAllTerms: () => {},
    setAllCredits: () => {},
    setAllSubjects: () => {},
    setAllCourses: () => {},
    setAllYearsTerms: () => {},
});

export { AllInfoContext };
