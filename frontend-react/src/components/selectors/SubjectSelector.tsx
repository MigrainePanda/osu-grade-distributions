import { useState, useContext, useEffect } from "react";
import Select from "react-select";

import Tooltip from "../Tooltip/Tooltip.tsx";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";

function SubjectSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { setSubjectName } = useContext(CurrInfoContext);
    const { allSubjects } = useContext(AllInfoContext);

    useEffect(() => {
        console.log("all ", allSubjects)
        const filtered = allSubjects.map((subject) => {
            return { label: subject['short'], value: subject['short'] }
        });
        setOptions(filtered)
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

export default SubjectSelector;