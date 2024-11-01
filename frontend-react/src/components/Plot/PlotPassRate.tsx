import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "react-device-sizes";
import { termNumToShortName } from "../../utils/conversions";

function PlotPassRate({ courses }) {
    const is1000 = useMediaQuery({ minWidth: 1000 });

    // const engrPassingGrades = [];
    const passingGrades = ["A", "A-", "B+", "B", "B-", "C+", "C"];
    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    for (const course of courses) {
        const term = termNumToShortName(course["term"]);
        const year = course["year"];

        const gradeData = JSON.parse(course["grade_data"]);
        let passRate = 0;
        for (const grade of passingGrades) {
            if (gradeData[grade] !== undefined) {
                passRate += Number(gradeData[grade]);
            }
        }

        labels.push(`${term}, ${year}`);
        if (passRate === 0) {
            courseData.push(NaN);
            continue;
        }
        courseData.push(Number(passRate.toFixed(2)));
    }

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
                text: `Pass Rate per Term`,
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

PlotPassRate.propTypes = {
    courses: PropTypes.array,
};

export default PlotPassRate;
