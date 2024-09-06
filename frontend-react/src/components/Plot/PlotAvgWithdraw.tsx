import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import { useMediaQuery } from 'react-device-sizes';
import { termNumToShortName } from "../../utils/conversions";

function PlotAvgGPA( { courses } ) {
    const is1000 = useMediaQuery({ minWidth: 1000 });

    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    for (const course of courses) {
        const term = termNumToShortName(course['term']);
        const year = course['year'];
        const gpa = course['gpa'];
        labels.push(`${term}, ${year}`);
        courseData.push(gpa);
    }

    const yMax = Math.round(Math.max(...courseData)*2) | 0;

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
                text: `Withdraw Rate per Term`,
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
                    return ` ${value}%`;
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
                    text: "Percentage",
                    font: {
                        size: 18
                    }
                },
                afterFit: function(scale) {
                    scale.width = 70
                },
                min: 0,
                max: yMax,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 16
                    }
                },
            }
        },
    }

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: [
                    "rgba(247, 200, 183, 0.6)"
                ],
                borderColor: [
                    "rgba(215, 63, 9, 0.6)"
                ],
                pointBackgroundColor: "rgba(215, 63, 9, 1)",
                fill: true,
            },
        ],
    }

    // const options = {
    //     indexAxis: "x" as const,
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //         legend: {
    //             display: false,
    //         },
    //         title: {
    //             display: true,
    //             text: `Withdraw Rate per Term`,
    //             font: {
    //                 size: 16
    //             }
    //         },
    //         zoom: {
    //             pan: {
    //                 enabled: true,
    //                 mode: 'x' as const
    //             },
    //             zoom: {
    //                 pinch: {
    //                     enabled: true
    //                 },
    //                 mode: 'x' as const,
    //             }
    //         }
    //     },
    //     pointRadius: 5,
    //     pointHoverRadius: 7,
    //     scales: {
    //         x: {
    //             title: {
    //                 display: true,
    //                 text: "Term, Year"
    //             },
    //             min: 0,
    //             max: 5,
    //         },
    //         y: {
    //             title: {
    //                 display: true,
    //                 text: "Average GPA"
    //             },
    //             max: 4.00,
    //             min: 0,
    //             ticks: {
    //                 stepSize: 0.5,
    //             },
    //         }
    //     }
    // }

    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             data: courseData,
    //             backgroundColor: [
    //                 "rgba(0, 50, 50, 1)"
    //             ],
    //             borderColor: [
    //                 "rgba(0, 0, 150, 1)"
    //             ]
    //         },
    //     ],
    // }

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

PlotAvgGPA.propTypes = {
    courses: PropTypes.array
}

export default PlotAvgGPA;