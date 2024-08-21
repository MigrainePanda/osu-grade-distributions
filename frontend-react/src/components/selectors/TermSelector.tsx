import { useState, useContext, useEffect } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";
import { CurrInfoContext } from "../contexts/CurrInfoContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";
import { termNumToName } from "../../utils/conversions.tsx";

import Select from "react-select";
import Tooltip from "../Tooltip/Tooltip.tsx";

function TermSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { year, setTerm } = useContext(CurrInfoContext);
    const { allTerms } = useContext(AllInfoContext);

    useEffect(() => {
        const filtered = allTerms.filter((term) => {
            if (term['year'] === year) return term;
        });
        // year = All
        if (filtered.length === 0) {
            const noOption = [
                { label: "All", value: "All" },
                { label: "Summer", value: "00" },
                { label: "Fall", value: "01" },
                { label: "Winter", value: "02" },
                { label: "Spring", value: "03" },
            ];
            setTerm(noOption[0]['value']);
            setValue(noOption[0]);
            setOptions(noOption);
            return;
        }
        const filteredOptions = filtered.map((term) => {
            const termName = termNumToName(term['term']);
            return { label: termName, value: term['term'] }
        });
        filteredOptions.unshift({ label: "All", value: "All" });
        setTerm(filteredOptions[0]['value']);
        setValue(filteredOptions[0]);
        setOptions(filteredOptions);
    }, [year, allTerms, setTerm]);

    const handleChange = (option) => {
        console.log("term updated ", option);
        setTerm(option["value"]);
        setValue(option);
    };

    return (
        <>
            <div className="select-container">
                <div className="select-label-info">
                    <h3 className="center-text">Term</h3>
                    <Tooltip message={"The term of which to filter data by (Summer, Fall, Winter, Spring)"} />
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