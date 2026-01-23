import { prisma } from "@/app/lib/prisma";

export  default async function GetAll(){

    const data  = await prisma.projecttype.findMany({

        orderBy :{

            ProjectTypeID:"desc"
        },


    });

    console.log("data :",data);

}