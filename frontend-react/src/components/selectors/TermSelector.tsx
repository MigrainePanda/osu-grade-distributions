import { useState, useContext, useEffect } from "react";
import Select from "react-select";

import { InformationContext } from "../contexts/CourseContext.tsx";
import { OptionsType, ValueType } from "./SelectorTypes.tsx";
import { termNumToName } from "../../utils/conversions.tsx";


const URL = import.meta.env.VITE_BACKEND_URL + "/terms";

function TermSelector() {
    const [options, setOptions] = useState<OptionsType>([]);
    const [value, setValue] = useState<ValueType>([]);
    const { year, setTerm } = useContext(InformationContext);

    async function loadOptions() {
        if (year === "All") {
            const options = [{ label: "N/A", value: "N/A" }];
            setValue(options[0]);
            setOptions(options);
            return;
        }

        const newURL = URL + `?year=${year}`
        const termsResp = await fetch(newURL);
        const terms = await termsResp.json();
        
        let formattedTerms = termNumToName(terms);
        formattedTerms = formattedTerms.map((term) => {
            return { label: term['termName'], value: term['term'] }
        })
        formattedTerms.unshift({ label: "All", value: "All" });
        setValue(formattedTerms[0]);
        setOptions(formattedTerms);
    }

    useEffect(() => {
        loadOptions();
    }, [year])

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
                        isSearchable
                    />
                </div>
            </div>
        </>
    )
}

export default TermSelector;