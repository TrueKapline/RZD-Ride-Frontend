<template>
    <div style="margin: auto; width: max-content; height: 100vh;">
        <h1 style="margin-bottom: 1vw;">Это главная страница для выбора маршрута</h1>
        <div style="display: flex;">
            <div style="margin-right: 2vw; background-color: white; border-radius: 16px; position: relative;" :style="isAvailStart ? 'border-radius: 16px 16px 0 0' : ''">
                <input @click="clickStartStation()" v-model="startStation" style="padding: 0.5vw; font-size: 16px; border-radius: 16px;"/>
                <div style="position: absolute; width: 100%; background-color: white; border-radius: 0 0 16px 16px;">
                    <div v-for="nameStation in arrStartStation" :key="nameStation.station_name" style="background-color: white; padding: 0.5vw; font-size: 16px; border-radius: 16px;">{{nameStation.station_name}}</div>
                </div>
            </div>
            <div style="margin-right: 2vw; background-color: white; border-radius: 16px; position: relative;" :style="isAvailEnd ? 'border-radius: 16px 16px 0 0' : ''">
                <input @click="clickEndStation()" v-model="endStation" style="padding: 0.5vw; font-size: 16px; border-radius: 16px;"/>
                <div v-for="nameStation in arrEndStation" :key="nameStation.station_name" style="background-color: white; padding: 0.5vw; font-size: 16px; border-radius: 16px;">{{nameStation.station_name}}</div>
            </div>
            <div>
                <button @click="getStation()" style="margin-right: 2vw; padding: 0.5vw; font-size: 16px; border-radius: 16px; cursor: pointer;">Найти маршруты</button>
            </div>
        </div>
        <div>
            <div @click="$router.push('/trip/'+route.uid);" v-for="route in arrRoute" :key="route.uid" :value="route.uid" style="padding: 1vw; background-color: white; margin: 1vw 0; border-radius: 12px; cursor: pointer; display: flex; justify-content: space-between;">
                <span style="width: 50%">{{route.title}}</span><span>{{route.depShow}}</span><span>{{route.arrShow}}</span>
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
            findURL: 'http://mypew.ru:3001/possible_station_names/',
            arrRoute: [],
            arrStartStation: [],
            isAvailStart: false,
            arrEndStation: [],
            isAvailEnd: false,
        }
    },
    methods: {
        async changeStartStation() { //Функция для загрузки подсказки набора станций
            this.startStation = this.startStation.trimStart();
            if (this.startStation != '') {
                try {
                    const response = await axios.get(this.findURL + this.startStation);
                    this.arrStartStation = response.data;
                    this.isAvailStart = true;
                } catch(e) {
                    alert('Error: ' + e);
                }
            } else {
                this.isAvailStart = false;
                this.arrStartStation = [];
            }
        },
        async changeEndStation() { //Функция для загрузки подсказки набора станций
            this.endStation = this.endStation.trimStart();
            if (this.endStation != '') {
                try {
                    const response = await axios.get(this.findURL + this.endStation);
                    this.arrEndStation = response.data;
                    this.isAvailEnd = true;
                } catch(e) {
                    alert('Error: ' + e);
                }
            } else {
                this.isAvailEnd = false;
                this.arrEndStation = [];
            }
        },
        clickStartStation() {
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.changeStartStation();
        },
        clickEndStation() {
            this.arrStartStation = [];
            this.isAvailStart = false;
            this.changeEndStation();
        },
        async getStation() { //Функция для получения списка станций
            if ((this.startStation != '') || (this.endStation != '')) {
                try {
                    const response = await axios.get(this.baseURL + this.startStation + '/' + this.endStation + '/' + '2022-10-28');
                    this.arrRoute = response.data;
                    console.log(this.arrRoute);
                    this.arrRoute.map(el => {
                        el.depShow = el.dep.slice(11, 16);
                        el.arrShow = el.arr.slice(11, 16);
                    })
                } catch(e) {
                    alert('Error: ' + e);
                }
            }
        }
    },
    watch: {
        startStation: function() {
            this.changeStartStation();
        },
        endStation: function() {
            this.changeEndStation();
        }
    }
}
</script>

<style scoped>

</style>