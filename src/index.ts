import { Hono } from 'hono'
import Blog from './routes/Blog.route'
import User from './routes/User.route'



const app = new  Hono().basePath("/api/v1")



app.route('/user',User)
app.route('/blog',Blog)





export default app
