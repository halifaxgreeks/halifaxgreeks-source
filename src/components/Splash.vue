<template>
  <div class="splash">
    <section class="bgimage">
      <div class="container h-90 d-flex justify-content-center">
        <div class="jumbotron header-div">
          <h1 class="display-3 hero-text">{{ $t('splash.mainTitle') }}</h1>
          <br />
          <nav class="nav flex-column flex-md-row">
            <router-link :to="{ name: 'Events'}" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('events.heading') }}</router-link>
            <!--<a class="nav-link btn btn-outline-info btn-menu-c rounded-0" v-bind:href="generateBulletinLink()">{{ $t('splash.bulletin') }}</a>-->
            <router-link v-for="key in renderKeys" :key="key" :to="{ name: key }" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ key }}</router-link>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import moment from 'moment';
import 'moment/locale/el';

export default {
  name: 'Splash',
  props: ['keys'],
  computed: {
    renderKeys() {
      // Prefer router-provided keys when available
      if (this.keys && Array.isArray(this.keys) && this.keys.length) {
        return this.keys
          .filter(k => k && k.text)
          .map(k => k.text);
      }

      // Fallback to global Trello store if router props haven't been set yet
      try {
        if (window && window.TRELLO_STORE) {
          return Object.keys(window.TRELLO_STORE || {});
        }
      } catch (e) {
        // ignore
      }

      return [];
    }
  },
  methods: {
    generateBulletinLink () {
      const currentYear = moment().format('YYYY');
      const currentMonth = moment().format('MM');

      let urlString1 = 'http://www.halifaxgreeks.ca/current-bulletin/'
      let urlString2 = '-post.pdf';

      return urlString1 + currentYear + '-' + currentMonth + urlString2;
    }
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
  }

    /* Remove previously-broken :not() selectors that affected global elements.
     Keep nav styles simple and scoped below. */

  .btn-menu-c {
      border-color: #17a2b8;
      color: #17a2b8;
  }

  .btn-menu-c:hover {
      background-color: #17a2b8;
      border-color: #17a2b8;
  }
  /* Allow nav buttons to wrap but keep them visually contiguous */
  .jumbotron .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    justify-content: center;
  }

  /* Ensure nav links don't get unintended border removals */
  /* Keep nav buttons visually contiguous horizontally, allow small vertical wrap spacing */
  .jumbotron .nav .nav-link {
    margin: 0 0 6px 0;
  }
</style>
