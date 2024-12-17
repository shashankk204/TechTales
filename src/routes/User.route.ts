import { Hono } from "hono";
import { signin, signup } from "../controller/User.controller";


const User=new Hono()


User.post("/signup",signup)
User.post("/signin",signin)


export default User


