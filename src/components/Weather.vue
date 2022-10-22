<template>
    <div class="time-and-weather">
        <h1 class="time">00:51</h1>
        <div class="weather">
            <img src="@/icons/sun-icon.svg" alt="" class="weather-icon">
            <span class="weather-text">Ясно, 15°С</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Weather"
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