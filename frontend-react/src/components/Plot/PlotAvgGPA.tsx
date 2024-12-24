import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "react-device-sizes";
import { termNumToShortName } from "../../utils/conversions";
import { useContext } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext";
import { IDToYearTerm } from "../../utils/conversions.react";

function PlotAvgGPA({ courses }) {
    const { allYearsTerms } = useContext(AllInfoContext);
    const is1000 = useMediaQuery({ minWidth: 1000 });

    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    function formatData() {
        for (const course of courses) {
            const [year, term] = IDToYearTerm(
                Array.from(allYearsTerms),
                course["year_term_id"]
            );

            const gpa = course["gpa"];
            labels.push(`${termNumToShortName(term)}, ${year}`);
            courseData.push(gpa);
        }
    }
    formatData();

    const options = {
        indexAxis: "x" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Avg GPA per Term`,
                font: {
                    size: 18,
                },
            },
            tooltip: {
                titleFont: {
                    size: 16,
                },
                bodyFont: {
                    size: 16,
                },
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return ` ${value}`;
                    },
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x" as const,
                },
                zoom: {
                    pinch: {
                        enabled: true,
                    },
                    mode: "x" as const,
                },
            },
        },
        pointRadius: 6,
        pointHoverRadius: 8,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Term, Year",
                    font: {
                        size: 18,
                    },
                },
                ticks: {
                    font: {
                        size: 16,
                    },
                },
                min: 0,
                max: is1000 ? 9 : 4,
            },
            y: {
                title: {
                    display: true,
                    text: "GPA (out of 4)",
                    font: {
                        size: 18,
                    },
                },
                afterFit: function (scale) {
                    scale.width = 80;
                },
                ticks: {
                    stepSize: 0.5,
                    font: {
                        size: 16,
                    },
                },
                min: 0,
                max: 4,
            },
        },
        layout: {
            padding: 0,
        },
    };

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: ["rgba(0, 50, 50, 1)"],
                borderColor: ["rgba(215, 63, 9, 0.6)"],
                pointBackgroundColor: "rgba(215, 63, 9, 1)",
            },
        ],
    };

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

PlotAvgGPA.propTypes = {
    courses: PropTypes.array,
};

export default PlotAvgGPA;
