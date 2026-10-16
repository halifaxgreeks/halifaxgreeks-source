<template>
  <div id="app">
    <button class="language-toggle-btn btn btn-warning rounded-0" @click="toggleLanguage">
      {{ $t('splash.toggle') }}
    </button>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    toggleLanguage() {
      const nextLocale = this.$i18n.locale === 'gr' ? 'en' : 'gr';
      this.$i18n.locale = nextLocale;
      document.cookie = `hfxgreeks_language=${nextLocale}; path=/; max-age=31536000`;
    }
  },
  mounted() {
  }
};
</script>

<style>
#app {
  position: relative;
}

.language-toggle-btn {
  position: fixed;
  right: 1rem;
  top: 1rem;
  z-index: 1030;
  cursor: pointer;
}

.bgimage {
    width: 100%;
    min-height: 100vh;
    background: url('~@/assets/greek_church_dull.jpg');
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    background-attachment: fixed;
}

.bgimage.blurred {
    background: url('~@/assets/greek_church_dull_blurred.jpg');
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
