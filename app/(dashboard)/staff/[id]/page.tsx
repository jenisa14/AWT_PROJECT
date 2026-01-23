import { prisma } from "@/app/lib/prisma";
import DeleteStaffBtn from "@/app/ui/staff/DeleteStaffBtn";


import Link from "next/link";

export default async function Details({
    params,

}:{
    params : Promise<{id:string}>;

}){
    const {id} = await params;

    const staff = await prisma.staff.findFirst({

        where :{

            StaffID : Number(id),


        },
    });

     return (
    <>
      <h2>Staff Details</h2>
      <br></br>
      <br></br>

      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
        
            <th><h3>Staff Name:</h3></th>
            <td><h2>{staff?.StaffName}</h2></td>
          </tr>

              <tr>
        
            <th><h3>Email:</h3></th>
            <td><h2>{staff?.Email}</h2></td>
          </tr>

              <tr>
        
            <th><h3>Phone:</h3></th>
            <td><h2>{staff?.Phone}</h2></td>
          </tr>
        </tbody>
      </table>

      <br />

      <div style={{ display: "flex", gap: "10px" }}>
        <Link href="/staff">
          <button>Back</button>
        </Link>
  
      <DeleteStaffBtn id={Number(id)}/>


      </div>
    </>
  );
}
