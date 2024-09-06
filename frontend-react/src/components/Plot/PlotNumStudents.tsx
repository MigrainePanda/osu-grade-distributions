import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import { useMediaQuery } from 'react-device-sizes';
import { termNumToShortName } from "../../utils/conversions";

function PlotNumStudents( { courses } ) {
    const is1000 = useMediaQuery({ minWidth: 1000 });

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
    const isGreaterThan200 = biggest > 200;
    const yMax = isGreaterThan200 ? biggest + 100 : biggest + 50 | 0;

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
                    size: 18
                }
            },
            tooltip: {
                titleFont: {
                    size: 16
                },
                bodyFont: {
                    size: 16
                },
                callbacks: {
                  label: function(context) {
                    const value = context.raw;
                    return ` ${value}`;
                  }
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
        pointRadius: 6,
        pointHoverRadius: 8,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Term, Year",
                    font: {
                        size: 18
                    }
                },
                ticks: {
                    font: {
                        size: 16
                    }
                },
                min: 0,
                max: is1000 ? 9 : 4,
            },
            y: {
                title: {
                    display: true,
                    text: "Number of Students",
                    font: {
                        size: 18
                    },
                },
                afterFit: function(scale) {
                    scale.width = 80
                },
                ticks: {
                    stepSize: isGreaterThan200 ? 100 : 25,
                    font: {
                        size: 16
                    }
                },
                min: 0,
                max: yMax,
            }
        },
        layout: {
            padding: 0
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
                    "rgba(215, 63, 9, 0.6)"
                ],
                pointBackgroundColor: "rgba(215, 63, 9, 1)",
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