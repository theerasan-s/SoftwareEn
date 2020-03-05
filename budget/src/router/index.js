import Vue from 'vue'
import Router from 'vue-router'
import budgetInfo from '@/components/budgetInfo'
import hello from '@/components/HelloWorld'
import home from '@/components/Home'
import edit from '@/components/Edit'
import login from '@/components/Login'
import viewDetail from '@/components/viewDetail'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
          },
          {
            path: '/s',
            name: 'home',
            component: hello
          },
          {
            path: '/budgetInfo',
            name: budgetInfo,
            component: budgetInfo
          },
          {
            path: '/edit',
            name: edit,
            component: edit
          },
          {
            path: '/login',
            name: login,
            component: login
          },
        
          {
            path: '/viewDetail',
            name: viewDetail,
            component: viewDetail
          },
          

    ]
})