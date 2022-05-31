import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/blog/BlogDetail.vue'
import BlogEdit from '../views/blog/BlogEdit.vue'
import Register from "@/views/Register";
import Problem from "@/views/Problem/Problem";
import Specials from "@/views/Problem/Specials";
import SpecialDetail from "@/views/Problem/SpecialDetail";
import Check from "@/views/Problem/Check";
import Rank from "@/views/Problem/Rank";
import Test from "@/views/test";
import MyBlog from "@/views/blog/MyBlog";
import makeProblem from "@/views/Problem/makeProblem";
import newLogin from "@/views/newLogin";
import Blogs from "@/views/blog/Blogs";
import Movie from "@/views/hauxin/movie"
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Test' }
  },{
    path:'/movie',
    name:'Movie',
    component:Movie
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    redirect: '/test/blogs',
    children:[
      {
        name:'rank',
        path:'/test/rank',
        component:Rank
      },
      {
        name:'blogs',
        path: '/test/blogs',
        component: Blogs
      },{
        path: '/test/make',
        name: 'Make',
        component: makeProblem
      },
      {
        path: '/test/check',
        name:'Check',
        component: Check
      } ,{
        path: '/test/problem/:pid',
        name:'Problem',
        component: Problem
      },
      {
        path:'/test/special/:sid',
        name:'SpecialDetail',
        component: SpecialDetail
      },
      {
        path: '/test/specials',
        name:'Specials',
        component: Specials
      },{
        path:'/test/myblog',
        name:'Myblog',
        meta: {
          requireAuth: true
        },
        component: MyBlog
      },
      {
        path: '/test/blog/add', // 注意放在 path: '/blog/:blogId'之前
        name: 'BlogAdd',
        //说明这个界面需要认证才能进去
        meta: {
          requireAuth: true
        },
        component: BlogEdit
      },
      {
        path: '/test/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
      },
      {
        path: '/test/blog/:blogId/edit',
        name: 'BlogEdit',
        meta: {
          requireAuth: true
        },
        component: BlogEdit
      }
    ]
  },{
    path: '/make',
    name: 'Make',
    component: makeProblem
  },{
    path: '/newLogin',
    name:'newLogin',
    component: newLogin
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/check',
    name:'Check',
    component: Check
  }
  ,{
    path: '/problem/:pid',
    name:'Problem',
    component: Problem
  },
  {
    path: '/specials',
    name:'Specials',
    component: Specials
  },
  {
    path:'/special/:sid',
    name:'SpecialDetail',
    component: SpecialDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name:'Register',
    component: Register
  },{
    path:'/myblog',
    name:'Myblog',
    meta: {
      requireAuth: true
    },
    component: MyBlog
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/blog/Blogs.vue')
  },
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    //说明这个界面需要认证才能进去
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
