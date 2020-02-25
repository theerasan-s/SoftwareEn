import Vue from 'vue'
import Router from 'vue-router'
import budgetInfo from '@/components/budgetInfo'
import hello from '@/components/HelloWorld'
import home from '@/components/Home'


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
          }
    ]
})