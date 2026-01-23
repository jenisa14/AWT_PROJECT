"use client"

import { AddProjectGroupAction } from "@/app/actions/projectgroup/AddProjectGroupAction";


export default function AddProjectGroupBtn(){

return(


        
        <div>
              

                <form action={AddProjectGroupAction} style ={{margin:0}}>
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