import { prisma } from "@/app/lib/prisma";
import DeleteStudentBtn from "@/app/ui/student/DeleteStudentBtn";

import Link from "next/link";

export default async function Details({
    params,

}:{
    params : Promise<{id:string}>;

}){
    const {id} = await params;

    const student = await prisma.student.findFirst({

        where :{

            StudentID : Number(id),


        },
    });

     return (
    <>
      <h2>Student Details</h2>
      <br></br>
      <br></br>

      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
        
            <th><h3>Student Name:</h3></th>
            <td><h2>{student?.StudentName}</h2></td>
          </tr>

              <tr>
        
            <th><h3>Email:</h3></th>
            <td><h2>{student?.Email}</h2></td>
          </tr>

              <tr>
        
            <th><h3>Phone:</h3></th>
            <td><h2>{student?.Phone}</h2></td>
          </tr>
        </tbody>
      </table>

      <br />

      <div style={{ display: "flex", gap: "10px" }}>
        <Link href="/student">
          <button>Back</button>
        </Link>
   

      <DeleteStudentBtn id={Number(id)}/>


      </div>
    </>
  );
}
