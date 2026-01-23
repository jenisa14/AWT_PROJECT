"use client"

import { AddProjectGroupMemberAction } from "@/app/actions/projectgroupmember/AddProjectGroupMemberAction";

export default function AddProjectGroupMemberBtn(){

return(


        
        <div>
              

                <form action={AddProjectGroupMemberAction} style ={{margin:0}}>
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