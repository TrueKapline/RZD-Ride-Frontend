<template>
    <main :style="isResultHidden === 1 ? 'justify-content: center' : ''">
        <div class="window search" :class="isResultHidden !== 1 ? 'fixed' : ''">
            <h1 class="header" :class="isResultHidden !== 1 ? 'hidden' : ''">Расписание электричек</h1>
            <div class="form" :class="isResultHidden !== 1 ? 'fixed-margin' : ''">
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
        
        <div class="error" :style="isResultHidden === 4 ? '' : 'display: none'" style="width: 100%">
            <div class="error__wrapper" style="height: 100%; margin: 0;">
                <div class="loader"></div>
            </div>
        </div>

        <div class="results" :style="isResultHidden === 3 ? '' : 'display: none'">
            <div class="window info">
                <div class="info__wrapper">
                    <h1 class="info__header">Расписания по маршруту {{ showStartStation }} – {{ showEndStation }}</h1>
                    <p class="info__date">{{ showDate }}</p>
                </div>
            </div>
            <table class="search-segments">
                <tbody class="search-segments__tbody">
                <tr class="parameters" v-for="route in arrRoute" :key="route.uid" :value="route.uid">
                    <td class="parameters__info">
                        <div class="parameters__info__segment">
                            <div class="parameters__info__segment__route" :style="route.isLeave ? 'opacity: 50%' : ''">
                                <span class="parameters__info__segment__route__text"
                                      @click="$router.push({name: 'TripPage', params: {uid: route.uid, date: route.dep}});">
                                    {{ route.title }}
                                </span>
                            </div>
                            <span class="parameters__info__segment__company"
                                  :style="route.isLeave ? 'opacity: 50%' : ''">
                                {{ route.carrier }}
                            </span>
                        </div>
                    </td>

                    <td class="parameters__departure">
                        <div class="parameters__departure__segment">
                            <span class="parameters__departure__segment__time"
                                  :style="route.isLeave ? 'opacity: 50%' : ''">{{ route.depShow }}</span>
                            <span class="parameters__departure__segment__explain"
                                  :style="route.isLeave ? 'opacity: 50%' : ''">Отбытие</span>
                        </div>
                    </td>

                    <td class="parameters__total">
                        <div class="parameters__total__segment">
                            <span class="parameters__total__segment__time" :style="route.isLeave ? 'opacity: 50%' : ''">
                                {{ route.travelTimeShow }}
                            </span>
                        </div>
                    </td>

                    <td class="parameters__arrival">
                        <div class="parameters__arrival__segment">
                            <span class="parameters__arrival__segment__time"
                                  :style="route.isLeave ? 'opacity: 50%' : ''">{{ route.arrShow }}</span>
                            <span class="parameters__arrival__segment__explain"
                                  :style="route.isLeave ? 'opacity: 50%' : ''">Прибытие</span>
                        </div>
                    </td>

                    <td class="parameters__has-left" :style="route.isLeave ? '' : 'display: none'">
                        <div class="parameters__has-left__segment">
                            <span class="parameters__has-left__segment__text">Ушёл</span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
        <div class="error" :style="isResultHidden === 2 ? '' : 'display: none'">
            <div class="error__wrapper">
                <img src="@/icons/smile.svg" alt="" class="error__image" draggable="false">
                <p class="error__text">По вашему запросу не найдено результатов</p>
            </div>
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
            arrEndStation: [], //Массив конечных станций для подсказки
            isAvailEnd: false, //Показывать подсказку конечных станций
            isResultHidden: 1, //Получен ли результат маршрутов 1 - нет запроса, 2 - ответ пустой 3 - ответ пришёл 4 - идёт загрузка
            selectStartStation: false, //Выбран input начальной станции
            selectEndStation: false, //Выбран input конечной станции
            selectDate: '', //Выбранная дата
            fromHint: '', //Подсказка для начально станции
            toHint: '', //Подсказка для конечной станции
            showDate: '', //Дата для показа
            showStartStation: '', //Начальная станция для вывода
            showEndStation: '', //Конечная станция для вывода
        };
    },
    methods: {
        async changeStartStation() { //Функция для загрузки подсказки набора стартовых станций
            this.startStation = this.startStation.trimStart();
            let bufferStartStation = this.startStation;
            if (!this.selectStartStation) {
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
            if (!this.selectEndStation) {
                try {
                    if (this.arrEndStation.length !== 0) {
                        this.toHint = this.endStation.trim() + this.arrEndStation[0].station_name.slice(this.endStation.trim().length);
                    } else {
                        this.toHint = '';
                    }
                    const response = await axios.get(this.findURL + '?station_name=' + this.endStation + '&from=' + this.startStation);
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
            let arrMounth = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
            this.showDate = this.selectDate.slice(8) + ' ' + arrMounth[this.selectDate.slice(5, 7) - 1];
            if (this.showDate[0] == '0') this.showDate = this.showDate.slice(1);
            if ((this.startStation != '') && (this.endStation != '') && (this.selectDate != '')) {
                try {
                    this.isResultHidden = 4;
                    const response = await axios.get(this.baseURL + '?from=' + this.startStation + '&to=' + this.endStation + '&transport_types=suburban&date=' + this.selectDate);
                    this.arrRoute = response.data;
                    console.log(this.arrRoute);
                    this.showStartStation = this.startStation;
                    this.showEndStation = this.endStation;
                    if (this.arrRoute.length === 0) {
                        this.isResultHidden = 2;
                    } else {
                        this.isResultHidden = 3;
                    }
                    this.arrRoute.map(el => {
                        el.hour = el.dep[21];
                        el.depShow = el.dep.slice(11, 16);
                        el.arrShow = el.arr.slice(11, 16);
                        if (el.carrier === 'Байкальская пригородная пассажирская компания') el.carrier = 'Байкальская ППК';
                        if (el.dep > ((new Date((new Date()).getTime() + (el.dep.slice(20, 22)) * 3600 * 1000)).toJSON())) el.isLeave = false;
                        else el.isLeave = true;
                        let travelTime = (new Date(el.arr) - new Date(el.dep)) / 60000;
                        let hour = 0;
                        if (travelTime >= 60) {
                            hour = Math.trunc(travelTime / 60);
                            el.travelTimeShow = hour + " ч ";
                        } else {
                            el.travelTimeShow = '';
                        }
                        el.travelTimeShow += (travelTime - hour * 60) + " мин";
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
    box-shadow: 0 4px 10px 2px hsla(0 0 58 / 15%);
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

.error {
    background-color: $white;
    border-radius: 10px;
    margin: 1.9em 0;
    box-shadow: 0 4px 10px 2px hsla(0 0 58 / 15%);
    height: 100%;

    &__wrapper {
        margin: 10em 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 70px;
    }

    &__image {
        user-select: none;
    }

    &__text {
        font-size: 72px;
        text-align: center;
        color: $main-color;
    }
}

.search-results {
    position: absolute;
    z-index: 1;
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
    box-shadow: 0 4px 10px 2px hsla(0 0 58 / 15%);
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
                font-size: 20px;
                transition: color 300ms cubic-bezier(0.5, 0, 0, 1);

                &__text {
                    cursor: pointer;
                }

                &:hover {
                    color: $accent-red-hover;
                }
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

.fixed {
    margin: 0;
    border-radius: 0 0 10px 10px;
    position: sticky;
    top: 0;
    z-index: 1;
}

.hidden {
    display: none;
}

.fixed-margin {
    margin: 40px 60px 40px;
}

.loader {
 width: 60%;
 height: 4px;
 border-radius: 30px;
 background-color: rgba(0,0,0,0.2);
 position: relative;
}

.loader::before {
 content: "";
 position: absolute;
 background: $accent-red;
 top: 0;
 left: 0;
 width: 0%;
 height: 100%;
 border-radius: 30px;
 -webkit-animation: moving 1s ease-in-out infinite;
         animation: moving 1s ease-in-out infinite;
 ;
}

@-webkit-keyframes moving {
 50% {
  width: 100%;
 }

 100% {
  width: 0;
  right: 0;
  left: unset;
 }
}

@keyframes moving {
 50% {
  width: 100%;
 }

 100% {
  width: 0;
  right: 0;
  left: unset;
 }
}
</style>