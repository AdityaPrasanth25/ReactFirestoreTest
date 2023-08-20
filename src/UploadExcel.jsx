import { useState,useEffect,ChangeEvent } from 'react';
import { db } from './config/firebase';
import { getDocs,collection,getDoc,doc } from 'firebase/firestore';
import * as XLSX from "xlsx";
import ExcelToFirestore from './ExcelToFirestore';
function UploadExcel() {

    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [courseName, setCourseName] = useState("");

    const handleChange = (e) => {
        setInputText(e.target.value.toUpperCase());
    };
    const handleChange2 = (e) => {
        setCourseName(e.target.value);
    };
    const handleFileUpload = (e) => {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      };
    }
  
    return (
    <>
      <div className="App">
        <br/><br/>
        <label for = "input">Enter Course Code: </label>
        <input type="text" onChange={handleChange} value={inputText} />
        <br/><br/>
        <label for = "input">Enter Course Name: </label>
        <input type="text" onChange={handleChange2} value={courseName} />
        <br/><br/>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          onChange={handleFileUpload} 
        />
        <br/><br/>
  
        {data.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
  
        <br /><br />
      </div>
      <ExcelToFirestore courseCode={inputText} courseName={courseName} excelData={data}/>    
      </>
    );
}
export default UploadExcel;
//


