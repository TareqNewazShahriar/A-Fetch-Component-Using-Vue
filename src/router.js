import Vue from 'vue'
import VueRouter from 'vue-router'
import MostCommonUseCase from './views/MostCommonUseCase.vue'
import MultiUrlExample from './views/MultiUrlExample.vue'
import NestedRequests from './views/NestedRequests.vue'
import LetsPost from './views/LetsPost.vue'
import LetsOccurAnError from './views/LetsOccurAnError.vue'

Vue.use(VueRouter)

const routes = [
   {
      name: 'common',
      path: '/',
      component: MostCommonUseCase
   },
   {
      name: 'multi-urls',
      path: '/multi-url-example',
      component: MultiUrlExample
   },
   {
      name: 'nested',
      path: '/nested-requests',
      component: NestedRequests
   },
   {
      name: 'post',
      path: '/lets-post',
      component: LetsPost
   },
   {
      name: 'error',
      path: '/lets-occur-an-error',
      component: LetsOccurAnError
   }
]

const router = new VueRouter({
   routes
})

export default router
