import { useEffect, useState } from "react";
import { db } from './config/firebase';
import { getDocs,collection,getDoc } from 'firebase/firestore';
import "./StudentMarks.css"
function StudentMarks(props){
   /* const [studentData, setStudentData] = useState([]);
    const studentCollectionReference = collection(db,"students");
    const usnToFind = props.usn;
    //console.log(studentCollectionReference);
    useEffect(()=>{
    const getStudentData = async () =>{
        
            try{
                const subColRef = collection(db,'students',usnToFind,'Marks');
                const dataSubCol = await getDocs(subColRef);
                const filteredDataSub = dataSubCol.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
              } ));
              console.log("filtered Data: ",filteredDataSub);

                setStudentData(filteredDataSub);
                
            }catch(err){
                console.log(err);
              }
        };
    getStudentData();
  },[]);
  console.log("Student data",studentData);*/
  const studentData = props.studentData;
  console.log("Student data",studentData,typeof(studentData));
    return(
        <div className="marksTable">
          <p>Details:</p>
          <table>
            <tr><th>Course Code</th><th>Course Name</th><th>IA1</th><th>IA2</th><th>IA3</th><th>Attendance</th></tr>
          {Object.keys(studentData['Marks']).map((key, index) => (
            <tr>
              <td>{key}</td>
              <td>{studentData['Marks'][key]['courseName']}</td>
              <td>{studentData['Marks'][key]['IA1']}</td>
              <td>{studentData['Marks'][key]['IA2']}</td>
              <td>{studentData['Marks'][key]['IA3']}</td>
              <td>{studentData['Marks'][key]['Attendance']}</td>

            </tr>
            
          ))}
          </table>
        </div>
    );
}
export default StudentMarks;