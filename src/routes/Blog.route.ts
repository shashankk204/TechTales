import { Hono } from 'hono'
import { FetchAllBlog, FetchBlogById, PostBlog, test, UpdateBlog } from '../controller/Blog.controller'

const Blog = new Hono()

Blog.get('/test',test)
Blog.post('/',PostBlog)
Blog.put('/',UpdateBlog)
Blog.get('/bulk',FetchAllBlog)
Blog.get('/:id',FetchBlogById)


export default Blog