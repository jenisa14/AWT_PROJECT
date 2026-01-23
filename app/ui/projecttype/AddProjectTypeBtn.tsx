"use client"

import { AddProjectTypeAction } from "@/app/actions/projecttype/AddProjectTypeAction";




export default function AddProjectTypeBtn(){

return(


        
        <div>
              

                <form action={AddProjectTypeAction} style ={{margin:0}}>
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