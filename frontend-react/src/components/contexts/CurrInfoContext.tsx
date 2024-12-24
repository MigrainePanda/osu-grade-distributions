import { createContext } from "react";

export type InformationType = {
    currYear: string;
    currTerm: string;
    currCourse: string;
    currSubject: string;
    currCoursesArr: Array<object>;
    setCurrYear: (c: string) => void;
    setCurrTerm: (c: string) => void;
    setCurrCourse: (c: string) => void;
    setCurrSubject: (c: string) => void;
    setCurrCoursesArr: (c: Array<object>) => void;
};

const CurrInfoContext = createContext<InformationType>({
    currYear: "All",
    currTerm: "N/A",
    currCourse: "None",
    currSubject: "None",
    currCoursesArr: [{}],
    setCurrYear: () => {},
    setCurrTerm: () => {},
    setCurrCourse: () => {},
    setCurrSubject: () => {},
    setCurrCoursesArr: () => {},
});

export { CurrInfoContext };
