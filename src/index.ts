import { Hono } from 'hono'
import Blog from './routes/Blog.route'
import User from './routes/User.route'
import { Auth } from './middlewares/Auth.Middleware'



const app = new  Hono().basePath("/api/v1")

app.use('/blog/*',Auth);

app.route('/user',User)
app.route('/blog',Blog)





export default app
