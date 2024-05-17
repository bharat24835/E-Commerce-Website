import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const[ok , setOk] = useState(false);
    const[auth , setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async()=>{
             console.log("Before axios ");
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
                headers : {
                    'Authorization' : auth?.token
                }
            });
            console.log("After Axios");
        if(res.data.ok ){
            setOk(true);
        }
        else{
            setOk(false);
        }
        }
        if(auth?.token)authCheck()
    } , [auth?.token])


    return ok ?<Outlet/> :<Spinner/>;
}