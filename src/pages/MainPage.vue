<template>
    <main :style="isResultHidden ? 'justify-content: center' : ''">
        <div class="window search">
            <h1 class="header">Расписание электричек</h1>
            <div class="form">
                <div class="from">
                    <input type="text" id="from" class="from__input" placeholder=" " autocomplete="off" @click="clickStartStation()"
                           v-model="startStation"
                           :style="isAvailStart ? 'border-radius: 10px 10px 0 0' : 'border-radius: 10px'">
                    <label for="from" class="from__label">Откуда</label>
                    <div class="search-results" :style="isAvailStart ? 'display: block' : 'display: none'">
                        <button @click="addStartStation(nameStation.station_name)" class="element-button" v-for="nameStation in arrStartStation"
                                :key="nameStation.station_yandex_code">
                            {{ nameStation.station_name }}
                        </button>
                    </div>
                </div>

                <img src="@/icons/arrow-large.svg" alt="" draggable="false">
                <div class="to">
                    <input type="text" id="to" class="to__input" placeholder=" " @click="clickEndStation()"
                           v-model="endStation"
                           :style="isAvailEnd ? 'border-radius: 10px 10px 0 0' : 'border-radius: 10px'">
                    <label for="to" class="to__label">Куда</label>
                    <div class="search-results" :style="isAvailEnd ? 'display: block' : 'display: none'">
                        <button @click="addEndStation(nameStation.station_name)" class="element-button" v-for="nameStation in arrEndStation"
                                :key="nameStation.station_yandex_code">
                            {{ nameStation.station_name }}
                        </button>
                    </div>
                </div>
                <input type="date" id="date" class="date">
                <button class="search-button" @click="getStation()">Найти маршруты</button>
            </div>
        </div>
        <div class="window results" :style="isResultHidden ? 'display: none' : ''">
            <div class="headings">
                <p>Отпр.</p>
                <p>Приб.</p>
                <p>В пути</p>
                <p>Маршрут</p>
            </div>
            <hr>
            <div class="wrapper">
                <div class="results-list" v-for="route in arrRoute" :key="route.uid" :value="route.uid"
                     @click="$router.push('/trip/'+route.uid);">
                    <div class="parameters">
                        <span class="parameter">{{ route.depShow }}</span>
                        <span class="parameter">{{ route.arrShow }}</span>
                        <span class="parameter">1 ч 23 м</span>
                        <span class="parameter">{{ route.title }}</span>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

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
            isResultHidden: true,
            selectStartStation: false,
            selectEndStation: false,
        };
    },
    methods: {
        async changeStartStation() { //Функция для загрузки подсказки набора стартовых станций
            this.startStation = this.startStation.trimStart();
            if (this.startStation != '' && !this.selectStartStation) {
                try {
                    const response = await axios.get(this.findURL + this.startStation);
                    this.arrStartStation = response.data;
                    if (this.arrStartStation.length !== 0) {
                        this.isAvailStart = true;
                    } else {
                        this.arrStartStation = [];
                        this.isAvailStart = false;
                    }
                } catch (e) {
                    alert('Error: ' + e);
                }
            } else {
                this.selectStartStation = false;
                this.isAvailStart = false;
                this.arrStartStation = [];
            }
        },
        async changeEndStation() { //Функция для загрузки подсказки набора конечных станций
            this.endStation = this.endStation.trimStart();
            if (this.endStation != '' && !this.selectEndStation) {
                try {
                    const response = await axios.get(this.findURL + this.endStation);
                    this.arrEndStation = response.data;
                    if (this.arrEndStation.length !== 0) {
                        this.isAvailEnd = true;
                    } else {
                        this.arrEndStation = [];
                        this.isAvailEnd = false;
                    }
                } catch (e) {
                    alert('Error: ' + e);
                }
            } else {
                this.selectEndStation = false;
                this.isAvailEnd = false;
                this.arrEndStation = [];
            }
        },
        clickStartStation() {
            this.selectStartStation = false;
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.changeStartStation();
        },
        clickEndStation() {
            this.selectEndStation = false;
            this.arrStartStation = [];
            this.isAvailStart = false;
            this.changeEndStation();
        },
        addStartStation(station) {
            this.selectStartStation = true;
            this.startStation = station;
            this.arrStartStation = [];
            this.isAvailStart = false;
        },
        addEndStation(station) {
            this.selectEndStation = true;
            this.endStation = station;
            this.arrEndStation = [];
            this.isAvailEnd = false;
        },
        async getStation() { //Функция для получения списка станций
            let time = (new Date()).toLocaleString();
            let date = time.slice(6, 10) + '-' + time.slice(3, 5) + '-' + time.slice(0, 2);
            this.arrStartStation = [];
            this.isAvailEnd = false;
            this.arrEndStation = [];
            this.isAvailStart = false;
            this.isResultHidden = false;
            if ((this.startStation != '') || (this.endStation != '')) {
                try {
                    const response = await axios.get(this.baseURL + this.startStation + '/' + this.endStation + '/' + date);
                    this.arrRoute = response.data;
                    console.log(this.arrRoute);
                    this.arrRoute.map(el => {
                        el.depShow = el.dep.slice(11, 16);
                        el.arrShow = el.arr.slice(11, 16);
                    });
                } catch (e) {
                    alert('Error: ' + e);
                }
            }
        },
    },
    watch: {
        startStation: function () {
            this.changeStartStation();
        },
        endStation: function () {
            this.changeEndStation();
        }
    },
    created() {
        document.addEventListener('click', () => {
            this.selectStartStation = false;
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.selectEndStation = false;
            this.arrStartStation = [];
            this.isAvailStart = false;
        });
    }
};
</script>

<style scoped lang="scss">

$white: #FFFFFF;
$main-color: #363636;
$input-grey: #9A9A9A;
$text-grey: #929292;
$accent-red: #FF3A38;
$accent-red-hover: #E31B1A;
$scrollbar-background: #DBDBDB;

main {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 3.1em;
}

h1 {
    color: $main-color;
}

img {
    user-select: none;
}

.window {
    background-color: $white;
    box-shadow: 0 4px 10px 2px #E0E0E3;
    border-radius: 10px;
    width: 100%;
    margin: 3.1em 0 0;
}

.header {
    margin: 35px 0 35px 60px;
}

.form {
    display: flex;
    margin: 0 60px 40px;
}

.from {
    position: relative;
    width: 19.9%;
    margin-right: 1%;

    &__input {
        width: calc(100% - 2em - 6px);
        height: 74px;
        top: 0;
        left: 0;
        border: 3px solid $main-color;
        color: $main-color;
        border-radius: 10px;
        font-family: inherit;
        font-size: 26px;
        outline: none;
        background: none;
        padding: 0 1em;
        user-select: none;
    }

    &__label {
        position: absolute;
        left: 1.1em;
        top: 0.85em;
        font-size: 26px;
        padding: 0 0.3rem;
        color: $input-grey;
        cursor: text;
        transition: top 200ms cubic-bezier(0.5, 0, 0, 1),
        left 200ms cubic-bezier(0.5, 0, 0, 1),
        font-size 200ms cubic-bezier(0.5, 0, 0, 1),
        color 500ms cubic-bezier(0.5, 0, 0, 1);
        background-color: $white;
        user-select: none;
    }
}

.from__input:focus ~ .from__label,
.from__input:not(:placeholder-shown).from__input:not(:focus) ~ .from__label {
    top: -10%;
    left: 8%;
    font-size: 16px;
    color: $main-color;
}

.to {
    position: relative;
    width: 19.9%;
    margin: 0 3% 0 1%;

    &__input {
        width: calc(100% - 2em - 6px);
        height: 74px;
        top: 0;
        left: 0;
        border: 3px solid $main-color;
        color: $main-color;
        border-radius: 10px;
        font-family: inherit;
        font-size: 26px;
        outline: none;
        background: none;
        padding: 0 1em;
        user-select: none;
    }

    &__label {
        position: absolute;
        left: 1.1em;
        top: 0.85em;
        font-size: 26px;
        padding: 0 0.3rem;
        color: $input-grey;
        cursor: text;
        transition: top 200ms cubic-bezier(0.5, 0, 0, 1),
        left 200ms cubic-bezier(0.5, 0, 0, 1),
        font-size 200ms cubic-bezier(0.5, 0, 0, 1),
        color 500ms cubic-bezier(0.5, 0, 0, 1);
        background-color: $white;
        user-select: none;
    }
}

.to__input:focus ~ .to__label,
.to__input:not(:placeholder-shown).to__input:not(:focus) ~ .to__label {
    top: -10%;
    left: 8%;
    font-size: 16px;
    color: $main-color;
}

.date {
    width: calc(19.9% - 2em - 6px);
    height: 74px;
    border: 3px solid $main-color;
    color: $main-color;
    border-radius: 10px;
    font-family: inherit;
    font-size: 26px;
    padding: 0 1em 0 1em;
}

.search-button {
    background: $accent-red;
    border: 3px solid $accent-red;
    border-radius: 10px;
    color: $white;
    width: 19.9%;
    height: 80px;
    font-family: inherit;
    font-size: 26px;
    transition: 500ms cubic-bezier(0.5, 0, 0, 1);
    margin-left: auto;
    user-select: none;
    outline: none;

    &:hover {
        background-color: $accent-red-hover;
        border-color: $accent-red-hover;
        cursor: pointer;
    }
}

.search-results {
    position: absolute;
    top: 77px;
    background-color: $white;
    border-radius: 0 0 10px 10px;
    border: 3px solid $main-color;
    width: calc(100% - 6px);
    max-height: 250px;
    overflow: hidden;
    overflow-y: scroll;
}

.element-button {
    display: block;
    border: unset;
    width: 100%;
    text-align: left;
    font-family: inherit;
    font-size: 26px;
    background-color: $white;
    border-radius: 10px;
    padding: .5em 1em .6em;
    color: $main-color;
    outline: none;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}

::-webkit-scrollbar {
    width: 30px;
}

::-webkit-scrollbar-track {
    background: $white;
    border-radius: 100vmax;
    margin-block: .3em;
}

::-webkit-scrollbar-thumb {
    background: $accent-red;
    border-radius: 100vmax;
    border: 10px solid $white;
}

.results {
    margin: 3em;
    max-height: 60vh;
}

.wrapper {
    max-height: 75%;
    overflow: hidden;
    overflow-y: scroll;
    margin-right: 50px;
}

.headings {
    display: flex;
    margin: 2% 0 2% 8%;

    p {
        color: $text-grey;
        font-size: 32px;
        margin-right: 11%;
    }

    p:nth-child(3) {
        margin-right: 22%;
    }

    p:last-child {
        margin-right: 0;
    }
}

hr {
    border: 2px solid #929292;
    border-top: none;
    margin: 0 60px;
}

.results-list {
    margin-bottom: 1em;
    cursor: pointer;
    hr {
        margin: 0 5px 0 60px;
    }

    .parameters {
        margin: 1% 0 1% 8%;

        .parameter {
            color: $main-color;
            font-size: 32px;
            margin-right: 11%;
        }

        .parameter:nth-child(3) {
            margin-right: 20.6%;
        }

        .parameter:last-child {
            margin-right: 0;
        }
    }
}

</style>