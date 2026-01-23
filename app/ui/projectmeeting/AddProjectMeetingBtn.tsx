"use client"

import { AddProjectMeetingAction } from "@/app/actions/projectmeeting/AddProjectMeetingAction";


export default function AddProjectMeetingBtn(){

return(


        
        <div>
              

                <form action={AddProjectMeetingAction} style ={{margin:0}}>
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