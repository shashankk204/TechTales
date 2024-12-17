import { Context } from "hono";
import { Bindings } from "../utils/types";
import { getPrisma } from "../utils/getprisma";
import { Jwt } from "hono/utils/jwt";



export const signup=async (c:Context<Bindings>)=>{
    const prisma=getPrisma(c.env.DATABASE_URL);
    let data=await c.req.json()
    let email=data.email;
    let password=data.password;
    let name=data.name; 
    
    try 
    {
        let newuser=await prisma.user.create({data:{
            email:email,
            password:password,
            name:name
        }});

        console.log(newuser);
        const token=await Jwt.sign({id:newuser.id},c.env.JWT_SECRET);
        return c.json({"Authorization":token});

    } 
    catch (error) 
    {
        // console.log(error.message);
        return c.json({"error":"User Already exists"},403)
    }

}



export const signin=async (c:Context<Bindings>)=>{
    const prisma=getPrisma(c.env.DATABASE_URL);
    
    
    let data = await c.req.json();
    let email=data.email;
    let password=data.password;

    
    const userdata=await prisma.user.findUnique({where:{email:email,password:password}});
    
    if(!userdata) return c.json({"error":"invalid Credintials"});


    const token=await Jwt.sign({id:userdata?.id},c.env.JWT_SECRET);//must from the id of the user
    return c.json({"Authorization":token});
    

}



// [
//     {
//         "id": "000bdc23-5548-4bc1-851b-ab35fea043c5",
//         "email": "test@gmail.com",
//         "name": "testacc",
//         "password": "123456"
//     },
//     {
//         "id": "0a3dc17e-d161-43c6-a768-def164962139",
//         "email": "test1@gmail.com",
//         "name": "testacc",
//         "password": "123456"
//     }
// ]