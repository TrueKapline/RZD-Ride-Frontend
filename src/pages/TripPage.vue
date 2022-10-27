<template>
    <div class="status window">
        <Stations/>
        <Weather/>
    </div>
    <div class="lower-part">
        <div class="time-table window">
            <div v-for="stop in arrStop" :key="stop.duration">
                {{stop.arrival}} <span v-if="stop.arrival && stop.departure">-</span> {{stop.departure}} {{stop.title}}
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
        Weather
    },
    data() {
        return {
            baseURL: 'http://mypew.ru:3001/route_data/',
            arrStop: [],
        }
    },
    methods: {
        async loadTrip() {
            try {
                const response = await axios.get(this.baseURL + this.$route.params.uid);
                this.arrStop = response.data.stops;
                console.log(this.arrStop);
                this.arrStop.forEach(el => {
                    if (el.arrival) {
                        el.arrival = el.arrival.slice(11, 16);
                    }
                    if (el.departure) {
                        el.departure = el.departure.slice(11, 16);
                    }
                })
            } catch(e) {
                alert('Error: ' + e);
            }
        }
    },
    created() {
        this.loadTrip();
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