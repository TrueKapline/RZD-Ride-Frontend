<template>
    <div style="margin: auto; width: max-content; height: 100vh;">
        <h1 style="margin-bottom: 1vw;">Это главная страница для выбора маршрута</h1>
        <input v-model="startStation" style="margin-right: 2vw; padding: 0.5vw; font-size: 16px; border-radius: 16px;"/>
        <input v-model="endStation" style="margin-right: 2vw; padding: 0.5vw; font-size: 16px; border-radius: 16px;"/>
        <button @click="getStation()" style="margin-right: 2vw; padding: 0.5vw; font-size: 16px; border-radius: 16px; cursor: pointer;">Найти маршруты</button>
        <div>
            <div @click="$router.push('/trip' + route.uid);" v-for="route in arrRoute" :key="route.uid" :value="route.uid" style="padding: 1vw; background-color: white; margin: 1vw 0; border-radius: 12px; cursor: pointer;">
                <span style="margin-right: 2vw;">{{route.number}}</span>{{route.title}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            startStation: '',
            endStation: '',
            baseURL: 'http://mypew.ru:3001/routes_suburbans_station_from_to/',
            arrRoute: [],
        }
    },
    methods: {
        changeStartStation() {
            
        },
        async getStation() {
            console.log('get')
            if ((this.startStation != '') || (this.endStation != '')) {
                console.log('find')
                try {
                    const response = await axios.get(this.baseURL + this.startStation + '/' + this.endStation);
                    this.arrRoute = response.data;
                    console.log(this.arrRoute);
                } catch(e) {
                    alert('Error: ' + e);
                }
            }
        },
        openTrip(uid) {
            console.log(uid);
            
        }
    },
    watch: {
        startStation: function() {
            this.changeStartStation();
        },
        endStation: function() {
            this.changeStartStation();
        }
    }
}
</script>

<style scoped>

</style>