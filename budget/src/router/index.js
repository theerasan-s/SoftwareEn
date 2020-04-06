import Vue from 'vue'
import Router from 'vue-router'
import budgetInfo from '@/components/budgetInfo'
import hello from '@/components/HelloWorld'
import home from '@/components/Home'
import edit from '@/components/Edit'
import login from '@/components/Login'
import viewDetail from '@/components/viewDetail'
import Addproject from '@/components/Addproject'
import register from '@/components/Register'
import admin from '@/components/admin'
import edituser from '@/components/edituser'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
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
            name: 'budgetInfo',
            component: budgetInfo
          },
          {
            path: '/',
            name: 'login',
            component: login
          },
          {
            path: '/register',
            name: 'register',
            component: register
          },
          {
            path: '/admin',
            name: 'admin',
            component: admin
          },
          {
            path: '/edituser',
            name: 'edituser',
            component: edituser
          }
          

    ]
})