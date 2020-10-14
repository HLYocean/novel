import Vue from 'vue'
import VueRouter from 'vue-router'
import NovelHeader from '../components/NovelHeader.vue'
import WoMan from '../views/woman/WoMan.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/novelheader',
        name: 'NovelHeader',
        component: NovelHeader,
    },
    {
        path: '/searchpage',
        name: 'SearchPage',
        props: true,
        component: () =>
            import ('../views/SearchPage.vue')
    },
    {
        path: '/searchbooklist',
        name: 'SearchBookList',
        props: true,
        component: () =>
            import ('../views/SearchBookList.vue')
    },
    {
        path: '/bookdetails',
        name: 'BookDetails',
        props: true,
        component: () =>
            import ('../views/BookDetails.vue')
    }, {
        path: '/bookcontents',
        name: 'BookContents',
        props: true,
        component: () =>
            import ('../views/BookContents.vue')
    }, {
        path: '/matter/:id/:bookname/:length/:index',
        name: 'Matter',
        props: true,
        component: () =>
            import ('../views/Matter.vue')
    }, {
        path: '/man',
        name: 'Man',
        props: true,
        component: () =>
            import ('../views/man/Man.vue')
    }, {
        path: '/',
        name: 'WoMan',
        props: true,
        component: WoMan
    }, {
        path: '/booklistdetails',
        name: 'BookListDetails',
        props: true,
        component: () =>
            import ('../components/BookListDetails')
    }, {
        path: '/bookrank',
        name: 'BookRank',
        props: true,
        component: () =>
            import ('../views/BookRank')
    }, {
        path: '/bookshelf',
        name: 'BookShelf',
        props: true,
        component: () =>
            import ('../views/BookShelf')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router