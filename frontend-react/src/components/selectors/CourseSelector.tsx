import { useState, useContext, useEffect } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";

import Select from "react-select";
import Tooltip from "../Tooltip/Tooltip.tsx";

function CourseSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { subjectName, setCourseName, year, term } = useContext(CurrInfoContext);
    const { allCourses } = useContext(AllInfoContext);

    function addOptions(uniqueCourses: Set<string>) {
        const filtered = Array.from(uniqueCourses);
        const sorted = filtered.sort();
        const formatted = sorted.map((course) => {
            return { label: course, value: course }
        })
        setOptions(formatted);
    }

    useEffect(() => {
        // just year/term, no subject
        if (subjectName === "") {
            return;
        }
        const uniqueCourses = new Set<string>();

        if (term !== "All" && year === "All") {
            allCourses.filter((course) => {
                const isSubject = course['subject'] === subjectName;
                const isTerm = course['term'] === term;
                const isUnique = uniqueCourses.has(course['short']);
                if (isSubject && isTerm && !isUnique) {
                    uniqueCourses.add(course['short']);
                    return true;
                }
                return false;
            });
            addOptions(uniqueCourses);
            return;
        }

        // subject, term
        if (term !== "All") {
            allCourses.filter((course) => {
                const isSubject = course['subject'] === subjectName;
                const isYear = course['year'] === year;
                const isTerm = course['term'] === term;
                const isUnique = uniqueCourses.has(course['short']);
                if (isSubject && isYear && isTerm && !isUnique) {
                    uniqueCourses.add(course['short']);
                    return true;
                }
                return false;
            });
            addOptions(uniqueCourses);
            return;
        }

        // subject, year
        if (year !== "" && year !== "All") {
            allCourses.filter((course) => {
                const isSubject = course['subject'] === subjectName;
                const isYear = course['year'] === year;
                const isUnique = uniqueCourses.has(course['short']);
                if (isSubject && isYear && !isUnique) {
                    uniqueCourses.add(course['short']);
                    return true;
                }
                return false;
            });
            addOptions(uniqueCourses);
            return;
        }

        // just subject
        allCourses.filter((course) => {
            const isSubject = course['subject'] === subjectName;
            const isUnique = uniqueCourses.has(course['short']);
            if (isSubject && !isUnique) {
                uniqueCourses.add(course['short']);
                return true;
            }
            return false;
        });
        addOptions(uniqueCourses);
    }, [allCourses, subjectName, year, term]);

    useEffect(() => {
        setCourseName("");
        setValue([]);
    }, [subjectName, setCourseName]);

    const handleChange = (option) => {
        console.log("course updated ", option);
        setCourseName(option['value']);
        setValue(option);
    }

    return(
        <>
            <div className="select-container">
                <div className="select-label-info">
                    <h3 className="center-text">Course</h3>
                    <Tooltip message={"Course number to indicate a specific course within that academic subject"} />
                </div>
                <div className="select-component-wrapper">
                    <Select 
                        className="select-component center-text"
                        options={options} 
                        value={value}
                        onChange={option => handleChange(option)}
                        placeholder="Select..."
                        isSearchable
                    />
                </div>
            </div>
        </>
    );
}

export default CourseSelector;