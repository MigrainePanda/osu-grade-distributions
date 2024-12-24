import { useState, useContext, useEffect } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";
import customStyles from "./SelectorStyle.tsx";

import Select from "react-select";
import Tooltip from "../Tooltip/Tooltip.tsx";

function YearSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { setCurrYear } = useContext(CurrInfoContext);
    const { allYears } = useContext(AllInfoContext);

    useEffect(() => {
        if (allYears.length === 0) {
            return;
        }
        const yearOptions = allYears.map((year) => {
            return {
                label: year["calendar_year"],
                value: year["calendar_year"],
            };
        });
        yearOptions.unshift({ label: "All", value: "All" });
        setCurrYear(yearOptions[0]["value"]);
        setValue(yearOptions[0]);
        setOptions(yearOptions);
    }, [allYears, setCurrYear]);

    const handleChange = (option) => {
        console.log("year updated ", option);
        setCurrYear(option["value"]);
        setValue(option);
    };

    return (
        <>
            <div className="select-container">
                <div className="select-label-info">
                    <h3 className="center-text">Year</h3>
                    <Tooltip
                        message={"The calendar year of which to filter data by"}
                    />
                </div>
                <div className="select-component-wrapper">
                    <Select
                        className="select-component center-text"
                        styles={customStyles}
                        options={options}
                        value={value}
                        onChange={(option) => handleChange(option)}
                        placeholder="Loading..."
                        isSearchable
                    />
                </div>
            </div>
        </>
    );
}

export default YearSelector;
