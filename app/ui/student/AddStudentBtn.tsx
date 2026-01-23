"use client"

import { AddStudentAction } from "@/app/actions/student/AddStudentAction";

export default function AddStudentBtn(){

return(


        
        <div>
              

                <form action={AddStudentAction} style ={{margin:0}}>
                <button type="submit" style={{backgroundColor:"red",
                    color:"white",
                    padding:"4px 8px",
                    border:"none",
                    cursor : "pointer",
                }}>

                    Add
                </button>
               </form>


               
        </div>
         
        
    );
}