import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
        mode: 'history',
        routes: [{
            path: '/',
            name: 'index',
            component: () =>
                import ('@/pages/index/index.vue'),
            meta: {
                title: '首页'
            }
        }, {
            path: '/home',
            name: 'home',
            component: () =>
                import ('@/pages/home/index.vue'),
            meta: {
                title: '主页'
            }
        }, {
            path: '/history',
            name: 'history',
            component: () =>
                import ('@/pages/history/index.vue'),
            meta: {
                title: '历史数据'
            }
        }, {
            path: '/head',
            name: 'head',
            component: () =>
                import ('@/pages/head/index.vue'),
            meta: {
                title: '头部'
            }
        }, {
            path: '/luming',
            name: 'luming',
            component: () =>
                import ('@/pages/lmProject/luming/index.vue'),
            meta: {
                title: '陆明 DOM'
            }
        }]
    })
    //to 为当前路由
    // from 为后退路由
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    console.log("to:", to, "from:", from, "next:");
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    next()
})

export default router;
