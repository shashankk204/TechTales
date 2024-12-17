import { Hono } from 'hono'
import { FetchAllBlog, FetchBlogById, PostBlog, UpdateBlog } from '../controller/Blog.controller'

const Blog = new Hono()


Blog.post('/',PostBlog)
Blog.put('/',UpdateBlog)
Blog.get('/:id',FetchBlogById)
Blog.get('/bulk',FetchAllBlog)


export default Blog