"use client"

import { AddStaffAction } from "@/app/actions/staff/AddStaffAction";



export default function AddStaffBtn(){

return(


        
        <div>
              

                <form action={AddStaffAction} style ={{margin:0}}>
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