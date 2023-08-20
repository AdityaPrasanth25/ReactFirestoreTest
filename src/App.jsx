import { useState } from 'react';
import parheekshaLogo from './assets/Parheeksha.png';
import './App.css';
import { ChangeEvent } from "react";
import { db } from './config/firebase';
import StudentMarks from './StudentMarks';
import { useEffect } from "react";
import HeaderStudent from './HeaderStudent';
import { getDocs,collection,getDoc,doc } from 'firebase/firestore';
import StudentDetails from './StudentDetails';
import UploadExcel from './UploadExcel';
/*function StudentMarks(props){
    const [studentData, setStudentData] = useState([]);
    const studentCollectionReference = collection(db,"students");
    const usn = props.usn;
    //console.log(studentCollectionReference);
    useEffect(()=>{
    const getStudentData = async () =>{
        
            try{
                const subColRef = collection(db,'students','1BY20CS011','Marks');
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
  console.log("Student data",studentData);
    return(
        <div className="marksTable">
          <p>Details :::</p>
          <table>
            <tr><th>Course Code</th><th>Course Name</th><th>IA1</th><th>IA2</th><th>IA2</th></tr>
          {studentData.map((course) => (
            <tr>
              <td>{course['id']}</td>
              <td>{course['Course-Name']}</td>
              <td>{course['IA1']}</td>
              <td>{course['IA2']}</td>
              <td>{course['IA3']}</td>
            </tr>
            
          ))}
          </table>
        </div>
    );
}*/
/*function Header(){
  return(
    <div>
      <header id="header">
      <nav>
			<a href = ""><img className="parheeksha-logo" src={parheekshaLogo} alt="logo"/></a>
			<ul>
				<li><a class="" href="">Home</a></li>
				<li><a href="">Teachers</a></li>
				<li><a href="">Students</a></li>
			</ul>
		</nav></header>
     </div>
  );
}*/
/*
function StudentDetails(props){
  const [studentName, setStudentName] = useState([]);
  let flag = 0;
  //const arrUsns = ['1BY20CS011','1BY20CS012','1BY20CS014','1BY20CS032'];
  //const arrNames = ['Aditya Prasanth','Aditya Singh','Ahobilesha','Asrith V P'];
  const usnOfStudent = props.usn;
  console.log(usnOfStudent);
  useEffect(()=>{
      const getStudentName = async()=>{
        const docRef = doc(db,"students",usnOfStudent);
       
        try {
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
              console.log("DocSnap data: ",docSnap.data());
              setStudentName(docSnap.data());
              console.log("StudentName: ",studentName);
              flag=1;
          } else {
              console.log("Document does not exist")
              //flag=0;            
          }
      
      } catch(error) {
          console.log(error)
      }
    }
    getStudentName();
  },[]);
  if(flag==1){
    return(
      <div className="studentDetails">
          <p>Usn : {props.usn}</p>
          <p>Name : {docSnap['Student-Name']}</p>
          <StudentMarks usn={props.usn} />
      </div>
    );
  }
  else{
  return(
    <div >
      <p>USN not found.</p>
    </div>
  );
  }
}*/
//import { useState, useEffect } from 'react';
//import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions as needed
/*Proper one
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
        <p>Name : {studentDetails['Student-Name']}</p>
        <StudentMarks usn={usnOfStudent} />
      </div>
    );
  } else {
    return (
      <div>
        <p>USN not found.</p>
      </div>
    );
  }
}*/

//export default StudentDetails;


function SearchStudent(){
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    // 👇 Store the input value to local state
    setInputText(e.target.value.toUpperCase());
  };
  return (
    <div>
      <label>Enter USN of the student: </label>
      <input type="text" onChange={handleChange} value={inputText} />
      {inputText.length == 10?<StudentDetails usn ={inputText}/>:<p>Invalid USN Format</p>}
    </div>
  );
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <HeaderStudent/>
    <p className='student-details-heading'>Student Details</p>
    <SearchStudent/>
    <UploadExcel/>
    </>
  );
}

export default App;
