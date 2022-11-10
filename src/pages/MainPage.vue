<template>
    <main :style="isResultHidden ? 'justify-content: center' : ''">
        <div class="window search">
            <h1 class="header">Расписание электричек</h1>
            <div class="form">
                <div class="from">
                    <input type="text" id="from" class="from__input" placeholder=" " autocomplete="off"
                           @click="clickStartStation()" v-model="startStation" @keyup.enter="enterClicked()">
                    <label for="from" class="from__label">Откуда</label>
                    <div class="from__hint">{{ fromHint }}</div>
                    <div class="search-results" :style="isAvailStart ? 'display: block' : 'display: none'">
                        <button @click="addStartStation(nameStation.station_name)" class="element-button"
                                v-for="nameStation in arrStartStation" :key="nameStation.station_yandex_code">
                            {{ nameStation.station_name }}
                        </button>
                    </div>
                </div>

                <img src="@/icons/arrows.svg" alt="" draggable="false" @click="changeStation()" style="cursor: pointer">
                <div class="to">
                    <input type="text" id="to" class="to__input" placeholder=" " autocomplete="off"
                           @click="clickEndStation()"
                           v-model="endStation" @keyup.enter="enterClicked()">
                    <label for="to" class="to__label">Куда</label>
                    <div class="to__hint">{{ toHint }}</div>
                    <div class="search-results" :style="isAvailEnd ? 'display: block' : 'display: none'">
                        <button @click="addEndStation(nameStation.station_name)" class="element-button"
                                v-for="nameStation in arrEndStation"
                                :key="nameStation.station_yandex_code">
                            {{ nameStation.station_name }}
                        </button>
                    </div>
                </div>
                <input v-model="selectDate" type="date" id="date" class="date">
                <button class="search-button" @click="getStation()">Найти маршруты</button>
            </div>
        </div>
        <div class="results" :style="isResultHidden ? 'display: none' : ''">
            <div class="window info">
                <div class="info__wrapper">
                    <h1 class="info__header">Расписания по маршруту Ангарск – Иркутск-Пасс.</h1>
                    <p class="info__date">15 ноября, вторник</p>
                </div>
            </div>
            <table class="search-segments">
                <tbody class="search-segments__tbody">
                <tr class="parameters" v-for="route in arrRoute" :key="route.uid" :value="route.uid">
                    <td class="parameters__info">
                        <div class="parameters__info__segment">
                            <div class="parameters__info__segment__route"
                                 @click="$router.push({name: 'TripPage', params: {uid: route.uid, date: route.dep}});">
                                {{ route.title }}
                            </div>
                            <span class="parameters__info__segment__company">
                                    {{ route.carrier.split(' ')[0] + ' ППК' }}
                                </span>
                        </div>
                    </td>

                    <td class="parameters__departure">
                        <div class="parameters__departure__segment">
                            <span class="parameters__departure__segment__time">{{ route.depShow }}</span>
                            <span class="parameters__departure__segment__explain">Отбытие</span>
                        </div>
                    </td>

                    <td class="parameters__total">
                        <div class="parameters__total__segment">
                            <span class="parameters__total__segment__time">{{ route.travelTimeShow }}</span>
                        </div>
                    </td>

                    <td class="parameters__arrival">
                        <div class="parameters__arrival__segment">
                            <span class="parameters__arrival__segment__time">{{ route.arrShow }}</span>
                            <span class="parameters__arrival__segment__explain">Прибытие</span>
                        </div>
                    </td>

                    <td class="parameters__has-left">
                        <div class="parameters__has-left__segment">
                            <span class="parameters__has-left__segment__text">Ушёл</span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            startStation: '', //Начальная станция
            endStation: '', //Конечная станция
            baseURL: 'https://mypew.ru:3001/routes', //Для запроса маршрутов
            findURL: 'https://mypew.ru:3001/possible', //Для запроса подсказок
            arrRoute: [], //Массив маршрутов
            arrStartStation: [], //Массив начальных станций для подсказки
            isAvailStart: false, //Показывать подсказку начальных станция
            arrEndStation: [], //Массив конечных станция для подсказки
            isAvailEnd: false, //Показывать подскзку конечных станций
            isResultHidden: true, //Получен ли результат маршрутов
            selectStartStation: false, //Выбран инпут начальной станция
            selectEndStation: false, //Выбран инпут конечной станция
            selectDate: '', //Выбранная дата
            fromHint: '', //Подсказка для начально станции
            toHint: '', //Подсказка для конечной станции
        };
    },
    methods: {
        async changeStartStation() { //Функция для загрузки подсказки набора стартовых станций
            this.startStation = this.startStation.trimStart();
            let bufferStartStation = this.startStation;
            if (this.startStation != '' && !this.selectStartStation) {
                try {
                    if (this.arrStartStation.length !== 0) {
                        this.fromHint = this.startStation.trim() + this.arrStartStation[0].station_name.slice(this.startStation.trim().length);
                    } else {
                        this.fromHint = '';
                    }
                    const response = await axios.get(this.findURL + '?station_name=' + this.startStation.trim());
                    if (bufferStartStation === this.startStation) {
                        this.arrStartStation = response.data;
                        if (this.arrStartStation.length !== 0) {
                            this.isAvailStart = true;
                            this.fromHint = this.startStation.trim() + this.arrStartStation[0].station_name.slice(this.startStation.trim().length);
                            if (this.fromHint == this.startStation) {
                                this.fromHint = '';
                            }
                        } else {
                            this.fromHint = '';
                            this.arrStartStation = [];
                            this.isAvailStart = false;
                        }
                    }
                } catch (e) {
                    alert('Error: ' + e);
                }
            } else {
                this.fromHint = '';
                this.selectStartStation = false;
                this.isAvailStart = false;
                this.arrStartStation = [];
            }
        },
        async changeEndStation() { //Функция для загрузки подсказки набора конечных станций
            this.endStation = this.endStation.trimStart();
            let bufferEndStation = this.endStation;
            if (this.endStation != '' && !this.selectEndStation) {
                try {
                    if (this.arrEndStation.length !== 0) {
                        this.toHint = this.endStation.trim() + this.arrEndStation[0].station_name.slice(this.endStation.trim().length);
                    } else {
                        this.toHint = '';
                    }
                    const response = await axios.get(this.findURL + '?station_name=' + this.endStation);
                    if (bufferEndStation === this.endStation) {
                        this.arrEndStation = response.data;
                        if (this.arrEndStation.length !== 0) {
                            this.isAvailEnd = true;
                            this.toHint = this.endStation.trim() + this.arrEndStation[0].station_name.slice(this.endStation.trim().length);
                            if (this.toHint == this.endStation) {
                                this.toHint = '';
                            }
                        } else {
                            this.toHint = '';
                            this.arrEndStation = [];
                            this.isAvailEnd = false;
                        }
                    }
                } catch (e) {
                    alert('Error: ' + e);
                }
            } else {
                this.toHint = '';
                this.selectEndStation = false;
                this.isAvailEnd = false;
                this.arrEndStation = [];
            }
        },
        clickStartStation() { //При нажатии на инпут стартовой станции
            this.selectStartStation = false;
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.changeStartStation();
        },
        clickEndStation() { //При нажатии на инпут конечной станции
            this.selectEndStation = false;
            this.arrStartStation = [];
            this.isAvailStart = false;
            this.changeEndStation();
        },
        addStartStation(station) { //При выборе какой-то начальной станции
            this.selectStartStation = true;
            this.startStation = station;
            this.arrStartStation = [];
            this.isAvailStart = false;
            this.fromHint = '';
        },
        addEndStation(station) { //При выборе какой-то конечно станции
            this.selectEndStation = true;
            this.endStation = station;
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.toHint = '';
        },
        async getStation() { //Функция для получения списка станций
            this.arrStartStation = [];
            this.isAvailEnd = false;
            this.arrEndStation = [];
            this.isAvailStart = false;
            if ((this.startStation != '') && (this.endStation != '') && (this.selectDate != '')) {
                try {
                    const response = await axios.get(this.baseURL + '?from=' + this.startStation + '&to=' + this.endStation + '&transport_types=suburban&date=' + this.selectDate);
                    this.isResultHidden = false;
                    this.arrRoute = response.data;
                    console.log(this.arrRoute);
                    this.arrRoute.map(el => {
                        el.hour = el.dep[21];
                        el.depShow = el.dep.slice(11, 16);
                        el.arrShow = el.arr.slice(11, 16);
                        let travelTime = (new Date(el.arr) - new Date(el.dep)) / 60000;
                        let hour = 0;
                        if (travelTime >= 60) {
                            hour = Math.trunc(travelTime / 60);
                            el.travelTimeShow = hour + " ч ";
                        } else {
                            el.travelTimeShow = '';
                        }
                        el.travelTimeShow += (travelTime - hour * 60) + " м";
                    });
                } catch (e) {
                    alert('Error: ' + e);
                }
            }
        },
        changeStation() {//Меняет местами станции
            this.selectStartStation = true;
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.selectEndStation = true;
            this.arrStartStation = [];
            this.isAvailStart = false;
            let buffer = this.startStation;
            this.startStation = this.endStation;
            this.endStation = buffer;
        },
        enterClicked() { //Заполняет инпуты на нажатие Enter
            if (this.fromHint != '') {
                this.startStation = this.fromHint;
                this.fromHint = '';
                this.selectStartStation = true;
                this.isAvailStart = false;
            }
            if (this.toHint != '') {
                this.endStation = this.toHint;
                this.toHint = '';
                this.selectEndStation = true;
                this.isAvailEnd = false;
            }
        }
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
        let time = (new Date()).toLocaleDateString();
        this.selectDate = time.slice(6, 10) + '-' + time.slice(3, 5) + '-' + time.slice(0, 2);
        document.addEventListener('click', () => {
            this.selectStartStation = false;
            this.arrEndStation = [];
            this.isAvailEnd = false;
            this.selectEndStation = false;
            this.arrStartStation = [];
            this.isAvailStart = false;
            this.fromHint = '';
            this.toHint = '';
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
    padding: 0 17.5em;
}

h1 {
    color: $main-color;
    font-size: 24px;
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

.from, .to {
    position: relative;
    margin-right: 1.6%;

    &__input {
        position: relative;
        width: calc(270px - 2em - 6px);
        height: 65px;
        top: 0;
        left: 0;
        border: 3px solid $main-color;
        border-radius: 10px;
        color: $main-color;
        font-family: inherit;
        font-size: 20px;
        outline: none;
        padding: 0 1em;
        user-select: none;
        background: none;
        z-index: 1;
    }

    &__label {
        position: absolute;
        left: 1.1em;
        top: 1.1em;
        font-size: 20px;
        padding: 0 0.3rem;
        color: $input-grey;
        cursor: text;
        transition: top 150ms cubic-bezier(0.5, 0, 0, 1),
        left 150ms cubic-bezier(0.5, 0, 0, 1),
        font-size 150ms cubic-bezier(0.5, 0, 0, 1),
        color 500ms cubic-bezier(0.5, 0, 0, 1);
        background-color: $white;
        user-select: none;
        z-index: 1;
    }

    &__hint {
        position: absolute;
        z-index: 0;
        left: 1.1em;
        top: 1.1em;
        font-size: 20px;
        padding: 0 0.1rem;
        color: $input-grey;
    }
}

.to {
    margin: 0 3.3% 0 1.6%;
}

.from__input:focus ~ .from__label, .to__input:focus ~ .to__label,
.from__input:not(:placeholder-shown).from__input:not(:focus) ~ .from__label,
.to__input:not(:placeholder-shown).to__input:not(:focus) ~ .to__label {
    top: -10%;
    left: 8%;
    font-size: 16px;
    color: $main-color;
}

.date {
    width: calc(270px - 2em - 6px);
    height: 65px;
    border: 3px solid $main-color;
    color: $main-color;
    border-radius: 10px;
    font-family: inherit;
    font-size: 20px;
    padding: 0 1em 0 1em;
    margin-right: 4%;
}

.search-button {
    background: $accent-red;
    border: 3px solid $accent-red;
    border-radius: 10px;
    color: $white;
    width: 270px;
    height: 71px;
    font-family: inherit;
    font-size: 20px;
    transition: 500ms cubic-bezier(0.5, 0, 0, 1);
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
    border-radius: 10px;
    border: 3px solid $main-color;
    width: calc(100% - 6px);
    max-height: 235px;
    overflow: hidden;
    overflow-y: scroll;
}

.element-button {
    display: block;
    border: unset;
    width: 100%;
    text-align: left;
    font-family: inherit;
    font-size: 20px;
    background-color: $white;
    padding: .5em 1em .5em;
    color: $main-color;
    outline: none;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
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
    max-height: 60vh;
    width: 100%;
}

.info {
    margin: 1.9em 0 0.95em;

    &__wrapper {
        padding: 1.9em 3.8em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__date {
        font-family: "russianrail-g-pro-medium", serif;
        font-size: 24px;
        color: $text-grey;
    }
}

.search-segments {
    width: 100%;
}

.parameters {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
    background-color: $white;
    border-radius: 10px;
    padding: 1.9em 3.8em;
    box-shadow: 0 4px 10px 2px #e0e0e3;
    position: relative;
    overflow: hidden;

    &__info {
        min-width: 30%;
        margin-right: 0.5em;

        &__segment {
            display: flex;
            flex-direction: column;

            &__route {
                color: $accent-red;
                cursor: pointer;
                font-size: 20px;
            }

            &__company {
                color: $text-grey;
                font-size: 16px;
                margin-top: 5px;
            }
        }
    }

    &__departure {
        min-width: 13%;
        margin: 0 0.5em;

        &__segment {
            display: flex;
            flex-direction: column;

            &__time {
                color: $main-color;
                font-size: 20px;
            }

            &__explain {
                color: $text-grey;
                font-size: 16px;
                margin-top: 5px;
            }
        }
    }

    &__total {
        min-width: 13%;
        margin: 0 1em;

        &__segment__time {
            color: $text-grey;
            font-size: 20px;
        }
    }

    &__arrival {
        min-width: 13%;
        margin: 0 0.5em;

        &__segment {
            display: flex;
            flex-direction: column;

            &__time {
                color: $main-color;
                font-size: 20px;
            }

            &__explain {
                color: $text-grey;
                font-size: 16px;
                margin-top: 5px;

            }
        }
    }

    &__has-left {
        display: none;
        position: absolute;
        background-color: $input-grey;
        border-bottom-left-radius: 10px;
        padding: 0.5em 1.5em;
        top: 0;
        right: 0;

        &__segment__text {
            color: $white;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 20px;
        }
    }
}


</style>