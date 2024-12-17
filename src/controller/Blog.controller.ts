import { Context } from "hono";
import { Bindings } from "../utils/types";


export const PostBlog=(c:Context<Bindings>)=>
{
    
    const data=c.req.json();
    
    return c.text("hello");
}



export const UpdateBlog=(c:Context<Bindings>)=>{
    return c.text("hello");
}



export const FetchBlogById=(c:Context<Bindings>)=>{

    
}



export const FetchAllBlog=(c:Context<Bindings>)=>{
    return c.text("hello");
}



