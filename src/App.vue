<template>
    <router-view></router-view>
</template>

<script>
export default {

}
</script>


<style lang="scss">

$bg-color: #E9EAED;

* {
    margin: 0;
}

html {
    height: 100%;
}

body {
    background-color: $bg-color;
    font-family: 'IBM Plex Sans', sans-serif;
    height: 100%;
    overflow: hidden;
}

#app {
    height: 100%;
}

h1 {
    font-family: "russianrail-g-pro-medium",serif;
    font-size: 36px;
}

@font-face {
    font-family: "russianrail-g-pro-medium";
    src: url("@/fonts/russianrail-g-pro-medium.ttf") format("truetype");
}
</style>
