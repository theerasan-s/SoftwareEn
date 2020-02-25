import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import hello from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: test
          },
          {
            path: '/s',
            name: 'home',
            component: hello
          },
    ]
})