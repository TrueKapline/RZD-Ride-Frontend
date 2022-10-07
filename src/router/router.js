import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from '@/pages/MainPage.vue'

const routes = [
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