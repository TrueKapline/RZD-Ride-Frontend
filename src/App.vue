<template>
    <router-view></router-view>
</template>

<script>
export default {

}
</script>


<style lang="scss">

$bg-color: #E9EAED;
$white: #FFFFFF;
$accent-red: #FF3A38;

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
}

#app {
    height: 100%;
}

h1 {
    font-family: "russianrail-g-pro-medium",serif;
    font-size: 36px;
    font-weight: normal;
}

@font-face {
    font-family: "russianrail-g-pro-medium";
    src: url("@/fonts/russianrail-g-pro-medium.ttf") format("truetype");
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    border-radius: 100vmax;
}

::-webkit-scrollbar-thumb {
    background: $accent-red;
    border-radius: 100vmax;
    border: 3px solid $bg-color;
}
</style>
