<template>
    <div class="time-and-weather">
        <h1 class="time">{{timeWeather[0]}}</h1>
        <div class="weather">
            <img src="@/icons/sun-icon.svg" alt="" class="weather-icon">
            <span class="weather-text">Ясно, {{weather}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Weather",
    props: {
        timeWeather: {
            type: Array,
        }
    },
    data() {
        return {
            weather: '15°С',
        }
    },
    watch: {
        timeWeather: function() {
            console.log(this.timeWeather);
            console.log('robit');
            //this.weather = `${this.timeWeather[1].temp}°С`;
        }
    }
};
</script>

<style scoped lang="scss">

.time-and-weather {
    display: flex;
    flex-direction: column;
    margin: 30px 30px 30px 0;
}

.weather {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 19px;
}

.time {
    text-align: right;
}

.weather-icon {
    margin-right: 10px;
}

.weather-text {
    font-size: 28px;
}

</style>