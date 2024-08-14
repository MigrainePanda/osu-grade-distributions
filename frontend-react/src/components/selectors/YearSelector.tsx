import { useState, useContext, useEffect } from "react";
import Select from "react-select";

import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx"


function YearSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { year, setYear } = useContext(CurrInfoContext);
    const { allYears } = useContext(AllInfoContext);

    useEffect(() => {
        console.log("asdfsdfsdfsdfsdfsd", allYears);
        const yearOptions = allYears.map((year) => {
            return { label: year['year'], value: year['year'] }
        });
        setOptions(yearOptions);
    }, [allYears])

    const handleChange = (option) => {
        console.log("year updated ", option)
        setValue(option);
        setYear(option["value"])
    };

    return (
        <>
            <div className="select-container">
                <div>
                    <h3 className="center-text">Year</h3>
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

export default YearSelector;