import { useState, useContext, useEffect } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";
import customStyles from "./SelectorStyle.tsx";

import Select from "react-select";
import Tooltip from "../Tooltip/Tooltip.tsx";

function CourseSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { currSubject, setCurrCourse } = useContext(CurrInfoContext);
    const { allCourses } = useContext(AllInfoContext);

    function addOptions(uniqueCourses: Set<string>) {
        const filtered = Array.from(uniqueCourses);
        const sorted = filtered.sort();
        const formatted = sorted.map((course) => {
            return { label: course, value: course };
        });
        setOptions(formatted);
    }

    useEffect(() => {
        if (allCourses.length === 0) {
            return;
        }
        const uniqueCourseNames = new Set<string>();

        if (currSubject === "") {
            return;
        }

        allCourses.map((course) => {
            const courseLong = course["long_name"];
            const courseShort = course["short_name"];

            if (uniqueCourseNames.has(courseLong)) {
                return;
            }
            if (courseShort !== currSubject) {
                return;
            }

            uniqueCourseNames.add(courseLong);
        });

        addOptions(uniqueCourseNames);
    }, [allCourses, currSubject]);

    useEffect(() => {
        setCurrCourse("");
        setValue([]);
    }, [currSubject, setCurrCourse]);

    const handleChange = (option) => {
        console.log("course updated ", option);
        setCurrCourse(option["value"]);
        setValue(option);
    };

    return (
        <>
            <div className="select-container">
                <div className="select-label-info">
                    <h3 className="center-text">Course</h3>
                    <Tooltip
                        message={
                            "Course number to indicate a specific course within that academic subject"
                        }
                    />
                </div>
                <div className="select-component-wrapper">
                    <Select
                        className="select-component center-text"
                        styles={customStyles}
                        options={options}
                        value={value}
                        onChange={(option) => handleChange(option)}
                        placeholder="Select..."
                        isSearchable
                    />
                </div>
            </div>
        </>
    );
}

export default CourseSelector;
