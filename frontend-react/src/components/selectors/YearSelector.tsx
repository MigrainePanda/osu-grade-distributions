import { useState, useContext, useEffect } from "react";
import Select from "react-select";

import { InformationContext } from "../contexts/CourseContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx"


const URL = import.meta.env.VITE_BACKEND_URL + "/years";

function YearSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { setYear } = useContext(InformationContext);

    async function loadOptions() {
        const yearsResp = await fetch(URL);
        const years = await yearsResp.json();
        const formattedYears = years.map((year) => {
            return { label: year['year'], value: year['year'] }
        });
        formattedYears.unshift({ label: "All", value: "All" });
        setYear(formattedYears[0]["value"]);
        setValue(formattedYears[0]);
        setOptions(formattedYears);
        console.log("years ", formattedYears);
    }

    useEffect(() => {
        loadOptions();
    }, []);

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