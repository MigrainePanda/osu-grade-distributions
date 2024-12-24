import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { possibleGrades } from "../../utils/letterGrades";

function PlotGrades({ courses }) {
    const labels = possibleGrades;
    const courseData: Array<number> = [];
    let courseTotalStudents = 0;

    function formatData() {
        for (let i = 0; i < possibleGrades.length; i++) {
            courseData.push(0);
        }

        for (const course of courses) {
            const gradeData = course["grade_data"];
            for (const i in possibleGrades) {
                const grade = possibleGrades[i];
                if (!(grade in gradeData)) {
                    gradeData[grade] = {
                        credits: 0,
                        student_count: 0,
                    };
                }
                courseData[i] += gradeData[grade]["student_count"];
                courseTotalStudents += gradeData[grade]["student_count"];
            }
        }
    }
    formatData();

    const options = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Grade Distribution of ${courseTotalStudents} students`,
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
                        const percentage = (
                            (value / courseTotalStudents) *
                            100
                        ).toFixed(2);
                        return ` ${value} (${percentage}%)`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Number of students",
                    font: {
                        size: 18,
                    },
                },
                ticks: {
                    font: {
                        size: 16,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Grade",
                    font: {
                        size: 18,
                    },
                },
                afterFit: function (scale) {
                    scale.width = 70;
                },
                ticks: {
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
                backgroundColor: [
                    "rgba(215, 63, 9, 0.6)",
                    "rgba(218, 74, 24, 0.6)",
                    "rgba(220, 86, 38, 0.6)",
                    "rgba(223, 97, 53, 0.6)",
                    "rgba(226, 109, 67, 0.6)",
                    "rgba(228, 120, 82, 0.6)",
                    "rgba(231, 132, 96, 0.6)",
                    "rgba(234, 143, 111, 0.6)",
                    "rgba(236, 154, 125, 0.6)",
                    "rgba(239, 166, 140, 0.6)",
                    "rgba(242, 177, 154, 0.6)",
                    "rgba(244, 189, 169, 0.6)",
                    "rgba(247, 200, 183, 0.6)",
                ],
                borderColor: [
                    "rgba(215, 63, 9, 1)",
                    "rgba(218, 74, 24, 1)",
                    "rgba(220, 86, 38, 1)",
                    "rgba(223, 97, 53, 1)",
                    "rgba(226, 109, 67, 1)",
                    "rgba(228, 120, 82, 1)",
                    "rgba(231, 132, 96, 1)",
                    "rgba(234, 143, 111, 1)",
                    "rgba(236, 154, 125, 1)",
                    "rgba(239, 166, 140, 1)",
                    "rgba(242, 177, 154, 1)",
                    "rgba(244, 189, 169, 1)",
                    "rgba(247, 200, 183, 1)",
                ],
                borderWidth: 3,
            },
        ],
    };

    return (
        <>
            <Bar options={options} data={data} />
        </>
    );
}

PlotGrades.propTypes = {
    courses: PropTypes.array,
};

export default PlotGrades;
