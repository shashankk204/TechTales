import {  Context, Next } from "hono";
import { Bindings } from "../utils/types";
import { Jwt } from "hono/utils/jwt";


export const Auth=async(c:Context<Bindings>,next:Next)=>
{
    let token=await c.req.header()["Authorization"];

    try {
            let id=await Jwt.verify(token,c.env.JWT_SECRET); 
        // @ts-ignore
        c.set("id", id);
        await next();
        
    } catch (error) {
        c.json({"error":"Unauthorized"},401);
    }
}
