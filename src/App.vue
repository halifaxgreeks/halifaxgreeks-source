<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
#app {
}
.bgimage {
    width: 100%;
    min-height: 100vh;
    background: url('./assets/greek_church_dull.jpg');
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    background-attachment: fixed;
}

.bgimage.blurred {
    background: url('./assets/greek_church_dull_blurred.jpg');
}
</style>
