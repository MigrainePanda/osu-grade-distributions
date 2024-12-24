import { useContext } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "react-device-sizes";
import { termNumToShortName } from "../../utils/conversions";
import { IDToYearTerm } from "../../utils/conversions.react";
import { passingGrades } from "../../utils/letterGrades";
import { AllInfoContext } from "../contexts/AllInfoContext";

function PlotAvgPassRate({ courses }) {
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

            const gradeData = course["grade_data"];
            let numStudentsPassed = 0;
            for (const grade of passingGrades) {
                if (gradeData[grade] !== undefined) {
                    numStudentsPassed += gradeData[grade]["student_count"];
                }
            }

            labels.push(`${termNumToShortName(term)}, ${year}`);
            if (numStudentsPassed === 0) {
                courseData.push(NaN);
                continue;
            }
            const displayed = (
                (numStudentsPassed / course["student_total"]) *
                100
            ).toFixed(2);

            courseData.push(Number(displayed));
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
                text: `Avg Pass Rate per Term`,
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
                        return ` ${value}%`;
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
                    text: "Percentage",
                    font: {
                        size: 18,
                    },
                },
                afterFit: function (scale) {
                    scale.width = 70;
                },
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: ["rgba(247, 200, 183, 0.6)"],
                borderColor: ["rgba(215, 63, 9, 0.6)"],
                pointBackgroundColor: "rgba(215, 63, 9, 1)",
                fill: true,
            },
        ],
    };

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

PlotAvgPassRate.propTypes = {
    courses: PropTypes.array,
};

export default PlotAvgPassRate;
