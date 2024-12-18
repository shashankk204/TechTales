import { Context } from "hono";
import { Bindings } from "../utils/types";
import { getPrisma } from "../utils/getprisma";
import { createBlogSchema, updatePostInput } from "@shashankk204/techtales";





export const PostBlog= async (c:Context<Bindings>)=>
{

    const authordid =c.get("id");
    const prisma = getPrisma(c.env.DATABASE_URL);    
    const data=await c.req.json();
    const typeCheck=createBlogSchema.safeParse(data);
    if(!typeCheck.success) return c.json({"message":typeCheck.error});

    const title=data.title;
    const content=data.content;

    try {
        let posted=await prisma.post.create({data:{title:title,content:content,authorId:authordid}});
        return c.json({"PostId":posted.id});
        
    } catch (error) {
        return c.json({"error":"something went wrong"});
    } 
}



export const UpdateBlog=async (c:Context<Bindings>)=>{
    const prisma=getPrisma(c.env.DATABASE_URL);
    const authorid=c.get("id");
    const body= await c.req.json();
    const typeCheck=updatePostInput.safeParse(body);
    if(!typeCheck.success) return c.json({"message":typeCheck.error});

    const title=body.title;
    const content=body.content;
    const postId=body.id;


    try{

        await prisma.post.update(
            {
                where:{
                    id:postId,
                    authorId:authorid
                },
                data:
                {
                    content:content,
                    title:title
                }
            })

        c.json({"message":"posted updated successfully"});
    }
    catch(e:any)
    {
        console.log("updata blog error:",e.message);
        c.json({"error":"something went wrong"});
    }

    
}



export const FetchBlogById= async (c:Context<Bindings>)=>{
    const prisma=getPrisma(c.env.DATABASE_URL);
    const id=c.req.param().id;
    try {
        const blog=await prisma.post.findUnique({where:{id:id}});
        // console.log(blog);
        return c.json(blog);
        
    } catch (error:any) {
        console.log("FetchBlogById",error.message);
        return c.json({"error":"something went wrong"});
    }
    
}



export const FetchAllBlog= async (c:Context<Bindings>)=>{
    
    const prisma=getPrisma(c.env.DATABASE_URL);
    try {
        const blogs=await prisma.post.findMany();
        return c.json(blogs);
        
    } catch (error:any) {
        console.log("FetchBlogById",error.message);
        return c.json({"error":"something went wrong"});
    }
}



//  "PostId": "fb7a9325-0d4d-4a7f-b219-f3a0aadf29a6"