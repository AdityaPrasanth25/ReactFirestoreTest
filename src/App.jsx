import { useState } from 'react';
import parheekshaLogo from './assets/Parheeksha.png';
import './App.css';
import { ChangeEvent } from "react";
import { db } from './config/firebase';
//import StudentMarks from './StudentMarks';
import { useEffect } from "react";

import { getDocs,collection,getDoc } from 'firebase/firestore';


function StudentMarks(props){
    const [studentData, setStudentData] = useState([]);
    const studentCollectionReference = collection(db,"students");
    const usn = props.usn;
    //console.log(studentCollectionReference);
    useEffect(()=>{
    const getStudentData = async () =>{
        
            try{
                /*const docRef = getDoc(studentCollectionReference,props.usn);
                const marksRef = collection(docRef,"Marks");
                const data = await getDocs(marksRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                } ));*/
                /*const colRef = collection(db,"students");
                const docRef = getDoc(colRef,usn);*/
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
          
          {studentData.map((course) => (
            <div>
              <p>{course['id']}</p>
              <p>{course['IA1']}</p>
              <p>{course['IA2']}</p>
              <p>{course['IA3']}</p>
              {/* Add other content here */}
            </div>
          ))}
        </div>
    );
}
function Header(){
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
}
function StudentDetails(props){
  const arrUsns = ['1BY20CS011','1BY20CS012','1BY20CS014','1BY20CS032'];
  const arrNames = ['Aditya Prasanth','Aditya Singh','Ahobilesha','Asrith V P'];
  if(props.usn.length==10 && arrUsns.includes(props.usn)){
    return(
      <div className="App">
          <p>Usn : {props.usn}</p>
          <p>Name : {arrNames[arrUsns.indexOf(props.usn)]}</p>
          <StudentMarks/>
      </div>
    );
  }
  return(
<div className="App">
  <p>USN not found.</p>
</div>
  );

}
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
      <StudentDetails usn ={inputText}/>
    </div>
  );

};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Header/>
    <p className='student-details-heading'>Student Details</p>
    <SearchStudent/>
   
    </>
  );
}

export default App;
