import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () =>{
     const [name , setname] = useState()
     const [email , setemail] = useState()
     const [age , setage] = useState()
     const navigateHome = useNavigate()

    const submit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/createUser",{name,email,age})
        .then((result)=> {
        console.log(result)
        navigateHome('/')
    })
        .catch((error)=>console.log(error))
        
    }
    return(
         <div className="d-flex vh-100 justify-content-center align-items-center bg-primary" >
            <div className="w-50 bg-white rounded p-3" >
                <form onSubmit={submit} >
                    <h2>Add User</h2>
                    <div className="mb-2" >
                        <label htmlFor="" >Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                          onChange={(e)=>setname(e.target.value)}/>
                    </div>
                    <div className="mb-2" >
                           <label htmlFor="">Email</label>
                           <input type="email" placeholder="Enter email" className="form-control"
                            onChange={(e)=>setemail(e.target.value)}/>
                    </div>
                    <div className="mb-2" >
                          <label htmlFor="">Age</label>
                          <input type="text" placeholder="Enter Age" className="form-control" 
                           onChange={(e)=>setage(e.target.value)}/> 
                    </div>
                    <button className="btn btn-success" >Submit</button>
                </form>
            </div>
         </div>
    )
}

export default CreateUser;