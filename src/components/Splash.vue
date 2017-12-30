<template>
  <div class="splash">
    <section class="bgimage">
      <div class="container h-90 d-flex justify-content-center">
        <div class="jumbotron header-div">
          <h1 class="display-3 hero-text">{{ $t('splash.mainTitle') }}</h1>

          <a class="language-toggle-btn btn btn-warning rounded-0" @click="toggleLanguage">{{ $t('splash.toggle') }} </a>

          <br />
            <nav class="nav flex-column flex-sm-row">
              <a class="nav-link btn btn-outline-info btn-menu-c rounded-0" href="#/events">{{ $t('splash.events') }}</a>
            </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Splash',
  data() {
    return {};
  },
  methods: {
    toggleLanguage() {
      if (this.$i18n.locale === 'gr') {
        this.$i18n.locale = 'en';
        this.$cookie.delete('hfxgreeks_language');
        this.$cookie.set('hfxgreeks_language', 'en', 7);
      } else {
        this.$i18n.locale = 'gr';
        this.$cookie.delete('hfxgreeks_language');
        this.$cookie.set('hfxgreeks_language', 'gr', 7);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .hero-text {
      font-size: 2em;
  }

  .header-div {
      margin-top: 32%;
      margin-left: 10%;
      margin-right: 10%;
  }

  @media (min-width: 576px) {
      :not(.nav .nav-link:last-child) {
          border-right: 0;
      }
  }
  @media (max-width: 576px) {
      :not(.nav .nav-link:last-child) {
          border-bottom: 0;
      }
  }

  .language-toggle-btn {
      position: absolute;
      right: 0px;
      top: 0px;
      cursor: pointer;
  }

  .btn-menu-c {
      border-color: #27ae60;
      color: #27ae60;
  }

  .btn-menu-c:hover {
      background-color: #27ae60;
      border-color: #27ae60;
  }
</style>
