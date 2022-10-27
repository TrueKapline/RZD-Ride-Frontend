<template>
    <div class="status window">
        <Stations/>
        <Weather/>
    </div>
    <div class="lower-part">
        <div class="time-table window"></div>
        <div class="map window"></div>
        <div class="interesting window"></div>
    </div>
    <button @click="getDataAPI()">Тык</button>
</template>

<script>
import axios from 'axios'
import Weather from "@/components/Weather";
import Stations from "@/components/Stations";

export default {
    components: {
        Stations,
        Weather
    },
    data() {
        return {
            URL: 'http://mypew.ru:3001/routes_suburbans_station_from_to/Ангарск/Кая'
        }
    },
    methods: {
        async getDataAPI() { //Получение данных с api
            try {
                const response = await axios.get(this.URL); //Запрос
                console.log(response);
            } catch(e) {
                alert('Error: ' + e);
            }
        },
    }
}
</script>

<style lang="scss">

$component-bg-color: #FFFFFF;
$text-color: #1F1F24;

html {
    height: 100%;
}

body {
    height: 100%;
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
    margin: 0 50px 2.5vw;
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
}

.time-table, .map, .interesting {
    height: 65vh;
}
</style>