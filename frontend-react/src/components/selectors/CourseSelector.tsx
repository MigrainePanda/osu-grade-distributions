import { useState, useContext, useEffect } from "react";
import Select from "react-select";

import Tooltip from "../Tooltip/Tooltip.tsx";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";

function CourseSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { subjectName, setCourseName } = useContext(CurrInfoContext);
    const { allCourses } = useContext(AllInfoContext);

    useEffect(() => {
        const uniqueCourses = new Set<string>();
        allCourses.filter((course) => {
            const subject = course['subject'] === subjectName;
            const unique = uniqueCourses.has(course['short']);
            if (subject && !unique) {
                uniqueCourses.add(course['short']);
                return true;
            }
            return false;
        });
        const filtered = Array.from(uniqueCourses);
        const sorted = filtered.sort();
        const formatted = sorted.map((course) => {
            return { label: course, value: course }
        })
        setOptions(formatted)
    }, [allCourses, subjectName]);

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
                    <Tooltip message={"Hello"} />
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