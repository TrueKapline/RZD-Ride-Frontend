<template>
    <div class="time-and-weather">
        <h1 class="time">{{time}}</h1>
        <div class="weather">
            <img :src="require(`@/icons/${pathImage}.svg`)" alt="" class="weather-icon">
            <span class="weather-text">{{this.weatherShow}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "Weather",
    props: {
        time: {
            type: String,
        },
        weather: {
            type: Object,
        }
    },
    data() {
        return {
            weatherShow: '',
            arrCondition: { 
                'clear': 'Ясно', 
                'partly-cloudy': 'Облачно', 
                'cloudy': 'Облачно',
                'overcast': 'Пасмурно',
                'drizzle': 'Дождь',
                'light-rain': 'Дождь',
                'rain': 'Дождь',
                'moderate-rain': 'Дождь',
                'heavy-rain': 'Дождь',
                'continuous-heavy-rain': 'Дождь',
                'showers': 'Ливень',
                'wet-snow': 'Дождь со снегом',
                'light-snow': 'Снег',
                'snow': 'Снег',
                'snow-showers': 'Снег',
                'hail': 'Град',
                'thunderstorm': 'Гроза',
                'thunderstorm-with-rain': 'Дождь',
                'thunderstorm-with-hail': 'Град',
            },
            arrPathImage: {
                'Ясно': 'sun-icon',
                'Пасмурно': 'clouds-icon',
                'Дождь': 'rain-icon',
                'Снег': 'snow-icon'
            },
            pathImage: 'sun-icon',
        }
    },
    watch: {
        weather: function() {
            this.weatherShow = this.arrCondition[this.weather.condition] + ', ' + this.weather.temp + '°С';
            this.pathImage = this.arrPathImage[this.arrCondition[this.weather.condition]];
            console.log(this.weather);
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