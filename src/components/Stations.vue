<template>
    <div class="station-info">
        <h1 class="status-title">{{status}}</h1>
        <span class="status-info">Следующая остановка – Горка</span>
    </div>
</template>

<script>
export default {
    name: "Status",
    props: {
        status: {
            type: String,
        }
    }
};
</script>

<style scoped lang="scss">

.station-info {
    margin: 30px 0 30px 30px;
}

.status-title {
    margin-bottom: 19px;
}

.status-info {
    font-size: 28px;
}
</style>