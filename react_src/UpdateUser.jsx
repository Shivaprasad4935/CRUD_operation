import React from "react";
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

const UpdateUser = () =>{

    const {id} = useParams();
    const [name , setname] = useState('')
    const [email , setemail] = useState('')
    const [age , setage] = useState('')
    const navigateHome = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3001/getuser/'+id)
        .then(result => {
            console.log(result)
            setname(result.data.name)
            setemail(result.data.email)
            setage(result.data.age)
        })
        .catch(err => console.log(err))
    },[])

    const update = (e) =>{
            e.preventDefault();
            axios.put("http://localhost:3001/updateuser/"+id,{name,email,age})
            .then((result)=> {
                console.log(result)
                navigateHome('/')
            })
            .catch((error)=>console.log(error))
            
        }  

    return(          
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary" >
            <div className="w-50 bg-white rounded p-3" >
                <form onSubmit={update}>
                    <h2>Add User</h2>
                    <div className="mb-2" >
                        <label htmlFor="" >Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                         value={name} onChange={(e)=>setname(e.target.value)} />
                    </div>
                    <div className="mb-2" >
                           <label htmlFor="">Email</label>
                           <input type="email" placeholder="Enter email" className="form-control" 
                            value={email} onChange={(e)=>setemail(e.target.value)} />
                    </div>
                    <div className="mb-2" >
                          <label htmlFor="">Age</label>
                          <input type="text" placeholder="Enter Age" className="form-control" 
                           value={age} onChange={(e)=>setage(e.target.value)} />
                    </div>
                    <button className="btn btn-success" >Submit</button>
                </form>
            </div>
         </div>     
    )
}

export default UpdateUser;