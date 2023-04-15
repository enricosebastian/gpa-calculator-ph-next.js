import React, { useEffect, useState } from "react";
import styles from "@/styles/Table.module.scss";

export default function Table({courses, changeCourseCode}) {

    const clickedCode = (event) => {
        // changeCourseCode(event.target.textContext, );
        // console.log(event.target.textContent);
    }

    const updatingValue = (parameter, event) => {
        // console.log(parameter+ ": "+ event.target.value);
        console.log("target.value: "+event.target.value);
        console.log("target.defaultValue: "+event.target.defaultValue);
        changeCourseCode(event.target.defaultValue, event.target.value);
    }

    const courseData = courses.map(course => 
        <tr key={`${course.code}-tr`}>
            <td key={`${course.code}-code--td`}>
                <input className={styles.table__code__input} onChange={() => updatingValue("code", event)} value={course.code}/>
            </td>
            <td key={`${course.code}-title--td`}>
                <input className={styles.table__title__input} onChange={() => updatingValue("title", event)} value={course.title}/>
            </td>
            <td key={`${course.code}-grade--td`} className={styles.table__grade__cell}>
                {course.grade}
            </td>
            <td key={`${course.code}-units--td`} className={styles.table__units__cell}>
                {course.units}
            </td>
        </tr>
    );

    return (
        <table className={styles.table__table__wrapper}>
            <thead>
               <tr>
                    <th>Course code</th>
                    <th>Course title</th>
                    <th>Grade</th>
                    <th>Units</th>
                </tr> 
            </thead>
            <tbody>
                {(courseData.length > 0) ?
                    courseData :
                    <tr>
                        <td>COURSE CODE</td>
                        <td>Course title here</td>
                        <td className={styles.table__grade__cell}>0.0</td>
                        <td className={styles.table__units__cell}>0.0</td>
                    </tr> 
                }
                
            </tbody>
        </table> 
    );
}