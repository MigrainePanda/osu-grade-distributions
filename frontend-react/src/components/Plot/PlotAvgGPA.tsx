import { Line } from "react-chartjs-2";
import { termNumToName } from "../../utils/conversions";

function PlotAvgGPA( { courses } ) {

    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    for (const course of courses) {
        const term = termNumToName(course['term']);
        const year = course['year'];
        const gpa = course['gpa'];
        labels.push(`${term}, ${year}`);
        courseData.push(gpa);
    }

    const options = {
        indexAxis: "x" as const,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Average GPA per Term`,
                font: {
                    size: 15
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Term, Year"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Average GPA"
                },
                max: 4.00,
                min: 0,
                ticks: {
                    stepSize: 0.5,
                },
            }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: [
                    "rgba(0, 200, 50, 1)"
                ],
                borderColor: [
                    "rgba(0, 0, 150, 1)"
                ]
            },
        ],
    }

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

export default PlotAvgGPA;