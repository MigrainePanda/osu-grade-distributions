import { useState, useContext, useEffect } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";
import customStyles from "./SelectorStyle.tsx";

import Select from "react-select";
import Tooltip from "../Tooltip/Tooltip.tsx";

function SubjectSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { setSubjectName } = useContext(CurrInfoContext);
    const { allSubjects } = useContext(AllInfoContext);

    useEffect(() => {
        const formatted = allSubjects.map((subject) => {
            return { label: subject['short'], value: subject['short'] }
        });
        setOptions(formatted)
    }, [allSubjects]);

    const handleChange = (option) => {
        console.log("subject updated ", option);
        setSubjectName(option['value']);
        setValue(option);
    }

    return(
        <>
            <div className="select-container">
                <div className="select-label-info">
                    <h3 className="center-text">Subject</h3>
                    <Tooltip message={"An abbreviation that indicates the academic subject area"} />
                </div>
                <div className="select-component-wrapper">
                    <Select 
                        className="select-component center-text"
                        styles={customStyles}
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

export default SubjectSelector;