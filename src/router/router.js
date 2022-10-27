import { createRouter, createWebHashHistory } from "vue-router";
import TripPage from '@/pages/TripPage.vue'

const routes = [
    {
        path: '/trip',
        component: TripPage,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;