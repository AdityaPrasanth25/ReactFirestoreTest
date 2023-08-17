import { useEffect, useState } from "react";
import { db } from './config/firebase';
import { getDocs,collection,getDoc } from 'firebase/firestore';


function StudentMarks(props){
    const [studentData, setStudentData] = useState([]);
    const studentCollectionReference = collection(db,"students");
    useEffect(()=> { 
    const getStudentData = async () =>{
        
            try{
                const docRef = getDoc(studentCollectionReference,props.usn);
                const marksRef = collection(docRef,"Marks");
                const data = await getDocs(marksRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                } ));
                setStudentData(filteredData);
            }catch(err){
                return(
                    <div>
                        <p>No available data</p>
                    </div>
                );
            }
        };
    getStudentData();
    },[]);
    return(
        <div className="marksTable">
            <table>
                <tr>
                    <th>Course-Code</th>
                    <th>IA1</th>
                    <th>IA2</th>
                    <th>IA3</th>
                </tr>
                {studentData.map((course)=>{
                    <tr>
                        <td>{course.id}</td>
                        <td>{course.IA1}</td>
                        <td>{course.IA2}</td>
                        <td>{course.IA3}</td>
                    </tr>
                })}
            </table>
        </div>
    );
}
export default StudentMarks;