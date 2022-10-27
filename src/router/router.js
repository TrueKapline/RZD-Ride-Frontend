import { createRouter, createWebHashHistory } from "vue-router";
import TripPage from '@/pages/TripPage.vue'
import MainPage from '@/pages/MainPage.vue'

const routes = [
    {
        path: '/trip/:uid',
        component: TripPage,
    },
    {
        path: '/',
        component: MainPage,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;