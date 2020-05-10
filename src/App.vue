<template>
  <router-view/>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted() {
  }
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
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    min-height: 100vh;
}

.heading {
  padding-top: 0.5em;
  padding-bottom: 2em;
  color: white;
}

@media (min-width: 700px) {
    .container-small {
        width: 700px;
    }
}

.container-small {
    max-width: 100%;
}

.single-card {
  padding-bottom: 10px;
}
</style>
