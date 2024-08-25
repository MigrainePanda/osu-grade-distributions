import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import { termNumToShortName } from "../../utils/conversions";

function PlotNumStudents( { courses } ) {

    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    for (const course of courses) {
        const term = termNumToShortName(course['term']);
        const year = course['year'];
        const studentTotal = course['student_total'];
        labels.push(`${term}, ${year}`);
        courseData.push(studentTotal);
    }
    const biggest = Math.ceil(Math.max(...courseData)/100)*100;
    const yMax = biggest + 100 | 0;

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
                text: `Number of Students per Term`,
                font: {
                    size: 16
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x' as const
                },
                zoom: {
                    pinch: {
                        enabled: true
                    },
                    mode: 'x' as const,
                }
            }
        },
        pointRadius: 5,
        pointHoverRadius: 7,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Term, Year"
                },
                min: 0,
                max: 5,
            },
            y: {
                title: {
                    display: true,
                    text: "Number of Students"
                },
                min: 0,
                max: yMax,
                ticks: {
                    stepSize: 100,
                    
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
                    "rgba(0, 50, 50, 1)"
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

PlotNumStudents.propTypes = {
    courses: PropTypes.array
}

export default PlotNumStudents;