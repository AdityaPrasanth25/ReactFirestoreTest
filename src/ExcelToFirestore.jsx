import { useState,useEffect,ChangeEvent } from 'react';
import { db } from './config/firebase';
import { getDocs,collection,getDoc,doc,setDoc } from 'firebase/firestore';
import * as XLSX from "xlsx";
function ExcelToFirestore(props){
    let flag=0;
    const dataFromExcel = props.excelData;
    const courseCode = props.courseCode;
    const courseName = props.courseName;
    dataFromExcel.map((student)=>{
        const setData=async()=>{
            /*await setDoc(doc(db, "students", "1BY20CS025"), {
                //StudentName: "Anoop Shastri S"
                Age:"21"
              },{merge:true});*/
              const docRef = doc(db,"students",student['USN']);
              await setDoc(docRef, {"Marks":{ [courseCode] :{"IA1":student['IA1'],"IA2":student['IA2'],"IA3":student['IA3'],"courseName":courseName,"Attendance":student['Attendance']}},"StudentName":student['Name']},{merge:true});
        }
        try{
            setData();
            flag=1;
        }catch(err){
            console.log("Firebase Insertion Error"+err);
        }
    });
    
   // console.log(props.excelData);
    if(flag==1){
        return(
            <div>
                <p>Firebase Insertion Successful</p>
            </div>
        );
    }
    return(
        <div>
            <p>Firebase Insertion Failed</p>
        </div>
    );
}
export default ExcelToFirestore;