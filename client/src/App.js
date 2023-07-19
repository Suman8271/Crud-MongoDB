import logo from './logo.svg';
import './App.css';
import { MdClose } from "react-icons/md";
import { useState, useEffect } from 'react';
import axios from "axios";
import Formtable from "./components/Formtable.js";
import { MdDelete } from 'react-icons/md';
import {BiSolidEditAlt, BiUnderline} from 'react-icons/bi';


axios.defaults.baseURL = "http://localhost:8080/"

function App() {

  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  
  
  const [formData,setFormData] = useState({
    name : "",
    email : "",
    mobile : "",
  })

  const [formDataEdit,setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    _id : ""
  })

  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
        alert(data.data.message)
        getFetchData()
      setFormData({
        name : "",
        email : "",
        mobile : ""
    })

   }
}

const getFetchData = async()=>{
  const data = await axios.get("/")
  console.log(data)
  if(data.data.success){
      setDataList(data.data.data)
  }
}
useEffect(()=>{
  getFetchData()
},[])

//console.log(dataList)

const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
    //alert(data.data.message)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
}

const handleUpdate = async(e)=>{
  e.preventDefault()
  const data = await axios.put("/update",formDataEdit)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
    setEditSection(false)
  }
}

const handleEditOnChange = async(e)=>{
  const {value,name} = e.target
  setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
  })
}

const handleEdit = (el)=>{
  setFormDataEdit(el)
  setEditSection(true)
}

  return (
    <>
      <div className="container">
        <h1 style={{textAlign:"center", fontFamily:"cursive", fontWeight : "bolder", backgroundImage : `url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148907305.jpg")`, borderRadius:"50px", borderColor:"black"}}>!!! Crud - Application !!!</h1>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

      {
        addSection && (
          <Formtable 
            handleSubmit = {handleSubmit}
            handleOnChange = {handleOnChange}
            handleclose = {() => setAddSection(false)}
            rest={formData}
          />
        )
      }
      {
        editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose = {()=>setEditSection(false)}
            rest={formDataEdit}
          />
        )
      }

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th style={{backgroundColor:"#19A7CE"}}>Name</th>
              <th style={{backgroundColor:"#19A7CE"}}>Email</th>
              <th style={{backgroundColor:"#19A7CE"}}>Mobile</th>
              <th style={{backgroundColor:"#19A7CE"}}>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              dataList[0] ? (
              dataList.map((el) => {
                return (
                  <tr>
                    <td style={{backgroundColor:"#B9E9FC"}}>{el.name}</td>
                    <td style={{backgroundColor:"#B9E9FC"}}>{el.email}</td>
                    <td style={{backgroundColor:"#B9E9FC"}}>{el.mobile}</td>
                    <td style={{backgroundColor:"#B9E9FC"}}>
                      <button className='btn btn-edit' onClick={() => handleEdit(el)}><BiSolidEditAlt/></button>
                      <button className='btn btn-delete' onClick={() =>handleDelete(el._id)}><MdDelete/></button>
                    </td>
                  </tr>
                )
              }))
              : (
                <p style={{textAlign:"center"}}> No Data Available at this moment...</p>
              )
            }
          </tbody>
        </table>
      </div>
        

      </div>
    </>
  );
}

export default App;
