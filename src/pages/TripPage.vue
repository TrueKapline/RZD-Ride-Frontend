<template>
    <div class="status window">
        <Stations v-bind:status="this.status"/>
        <Weather v-bind:time="this.time" v-bind:weather="weather"/>
    </div>
    <div class="lower-part">
        <div class="time-table window">
            <div v-for="stop in arrStop" :key="stop.duration">
                {{stop.arrivalShow}} <span v-if="stop.arrivalShow && stop.departureShow">-</span> {{stop.departureShow}} {{stop.title}}
            </div>
        </div>
        <div class="map window"></div>
        <div class="interesting window"></div>
    </div>
</template>

<script>
import axios from 'axios'
import Weather from "@/components/Weather";
import Stations from "@/components/Stations";

export default {
    components: {
        Stations,
        Weather,
    },
    props: {
        uid: {
            type: String,
        },
        date: {
            type: String,
        },
    },
    data() {
        return {
            baseURL: 'https://mypew.ru:3001/stops', //Ссылка на маршруты
            arrStop: [], //Массив остановок
            interval: null, //Интервал
            time: '', //Время, погода
            status: ['', ''], //Маршрут сейчас, следующая остановка
            baseURLWeather: 'https://mypew.ru:3001/weather', //Ссылка на погоду
            stationNow: '', //На какую станцию был сделан запрос погоды
            weather: {}, //Погода
        }
    },
    methods: {
        async loadTrip() { //Загрузка маршрута
            try {
                const response = await axios.get(this.baseURL + '?uid=' + this.uid + '&date=' + this.date.slice(0,10));
                this.arrStop = response.data.stops;
                console.log(this.arrStop);
                this.arrStop.forEach((el, index) => {
                    if (el.arrival) {
                        el.arrivalShow = el.arrival.slice(11, 16);
                    }
                    if (el.departure) {
                        el.departureShow = el.departure.slice(11, 16);
                    }
                });
                this.createStop();
                this.interval = setInterval(() => {
                    this.createStop()
                }, 1000);
            } catch(e) {
                alert('Error: ' + e);
            }
        },
        createStop() { //Загрузка на какой станции находится электричка
            let buffer = (new Date());
            let timer = (new Date(buffer.getTime() + parseInt(this.date.slice(20,22))*3600*1000)).toJSON();
            timer = timer.slice(0, 10) + ' ' + timer.slice(11);
            let timerFormat = timer;
            if (this.arrStop[0].departure > timerFormat) this.status[0] = "Поезд ещё не выехал";
            if (this.arrStop[this.arrStop.length - 1].arrival < timerFormat) this.status[0] = "Поезд уже закончил свой маршрут";
            this.time = timer.slice(11, 19);
            this.arrStop.forEach((el, index) => {
                if (el.departure > timerFormat && el.arrival <= timerFormat) {
                    this.status[0] = "Стоянка на станции " + el.title;
                    if (this.stationNow != el.title) {
                        this.loadWeather(el.title, el.yandex_code);
                        this.stationNow = el.title;
                    }
                    if (index < this.arrStop.length - 1) this.status[1] = "Следующая остановка – " + this.arrStop[index + 1].title;
                }
                else if ((index < this.arrStop.length - 1) && (el.departure <= timerFormat) && (this.arrStop[index + 1].arrival > timerFormat)) {
                    this.status[0] = el.title + " - " + this.arrStop[index + 1].title;
                    if (this.stationNow != this.arrStop[index + 1].title) {
                        this.loadWeather(this.arrStop[index + 1].title, this.arrStop[index + 1].yandex_code);
                        this.stationNow = this.arrStop[index + 1].title;
                    }
                    if (index < this.arrStop.length - 1) this.status[1] = "Следующая остановка – " + this.arrStop[index + 1].title;
                } else if (index > this.arrStop.length - 1) {
                    this.status[1] = '';
                }
            });
        },
        async loadWeather(title, yandex_code) { //Загрузка погоды
            try {
                const responseWeather = await axios.get(this.baseURLWeather + '?type_info=fact&station=' + yandex_code);
                this.weather = responseWeather.data;
                console.log(title, yandex_code);
            } catch {
                alert('Error: ' + e);
            }
        }
    },
    created() {
        this.loadTrip();
    }
}
</script>

<style scoped lang="scss">

$component-bg-color: #FFFFFF;
$text-color: #1F1F24;

body {
    display: flex;
    justify-content: center;
    align-items: center;
}

#app {
    width: 100%;
}

.window {
    box-shadow: 0 4px 10px 2px #E0E0E3;
}

.status {
    height: 158px;
    margin: 3em 3em 2.5vw;
    background-color: $component-bg-color;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.lower-part {
    display: flex;
    flex-direction: row;
    gap: 2.5vw;
    margin: 0 50px;
}

.time-table, .map, .interesting {
    width: 100%;
    border-radius: 10px;
    background-color: $component-bg-color;
    overflow: hidden;
    overflow-y: auto;
}

.time-table, .map, .interesting {
    height: 65vh;
}
</style>