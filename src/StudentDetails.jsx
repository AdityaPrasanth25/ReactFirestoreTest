import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions as needed
import { db } from './config/firebase';
import StudentMarks from './StudentMarks';

function StudentDetails(props) {
    const [studentDetails, setStudentDetails] = useState(null);
  
    const usnOfStudent = props.usn; // Fix casing of 'usn'
  
    useEffect(() => {
      const getStudentName = async () => {
        const docRef = doc(db, "students", usnOfStudent);
  
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("DocSnap data: ", docSnap.data());
            setStudentDetails(docSnap.data());
             // Update state with student details
          } else {
            console.log("Document does not exist");
            setStudentDetails(null); // Clear student details
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      getStudentName();
    }, [usnOfStudent]); // Add usnOfStudent to the dependency array
    console.log("StudentName data:",studentDetails)
    if (studentDetails) {
      return (
        <div className="studentDetails">
          <p>Usn : {usnOfStudent}</p>
          <p>Name : {studentDetails['StudentName']}</p>
          <StudentMarks usn={usnOfStudent} studentData={studentDetails} />
        </div>
      );
    } else {
      return (
        <div>
          <p>USN not found.</p>
        </div>
      );
    }
  }
  
  export default StudentDetails;