import {  Context, Next } from "hono";
import { Bindings } from "../utils/types";
import { Jwt } from "hono/utils/jwt";



export const Auth=async(c:Context<Bindings>,next:Next)=>
{
    let token= c.req.header("Authorization") as string;
    try{
        let id=await Jwt.verify(token,c.env.JWT_SECRET);
        const userid=id.id as string;
        c.set('id',userid);
        await next();

    }
    catch(e)
    {
        return c.json({"message":"invalid token"});
    }
   

}
