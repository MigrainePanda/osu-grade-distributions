import { Bar } from "react-chartjs-2";

function PlotGrades( { courses } ) {
    const possibleGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
    const labels = possibleGrades;
    const courseData: Array<number> = [];
    let displayedTotalStudents = 0;

    function formatData() {
        for (let i=0; i<possibleGrades.length; i++) {
            courseData.push(0);
        }
    
        for (const course of courses) {
            const studentTotal = course['student_total'];
            const gradeData = JSON.parse(course['grade_data']);
            for (const grade of possibleGrades) {
                if (!(grade in gradeData)) {
                    gradeData[grade] = "0";
                }
            }
    
            let courseStudentTotal = 0;
            for (let i=0; i<possibleGrades.length; i++) {
                const grade = possibleGrades[i];
                const num = Math.round((parseFloat(gradeData[grade])/100 * studentTotal));
                courseData[i] += num;
                courseStudentTotal += num;
            }
            
            displayedTotalStudents += courseStudentTotal;
        }
    }
    formatData();

    const options = {
        indexAxis: "y" as const,
        // scales: {
        //     x: {
        //         ticks: {
        //             stepSize: 1
        //         }
        //     }
        // },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Grade Distribution of ${displayedTotalStudents} students`,
            },
        },
    }

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: "rgba(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 1,
            },
        ],
    }

    return (
        <>
            <Bar options={options} data={data} />
        </>
    );

}

export default PlotGrades;