import { useState, useContext } from "react";
import Select from "react-select";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";

function TermSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { setTerm } = useContext(CurrInfoContext);

    const handleChange = (option) => {
        console.log("term updated ", option)
        setValue(option);
        setTerm(option["value"])
    };

    return (
        <>
            <div className="select-container">
                <div>
                    <h3 className="center-text">Term</h3>
                </div>
                <div className="select-component-wrapper">
                    <Select 
                        className="select-component center-text"
                        options={options} 
                        value={value}
                        onChange={option => handleChange(option)}
                        placeholder="Loading..."
                        isSearchable
                    />
                </div>
            </div>
        </>
    )
}

export default TermSelector;