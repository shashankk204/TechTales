import { Hono } from 'hono'
import { FetchAllBlog, FetchBlogById, PostBlog, UpdateBlog } from '../controller/Blog.controller'

const Blog = new Hono()

Blog.post('/',PostBlog)
Blog.put('/',UpdateBlog)
Blog.get('/bulk',FetchAllBlog)
Blog.get('/:id',FetchBlogById)


export default Blog