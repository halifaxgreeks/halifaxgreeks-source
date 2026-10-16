<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top rounded">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul class="navbar-nav mt-2 mt-lg-0">
        <router-link tag="li" :to="{ name: 'Splash' }" class="nav-item" active-class="active">
          <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('splash.title') }}</a>
        </router-link>
        <template v-if="navKeys && navKeys.length">
          <router-link
            v-for="key in navKeys"
            :key="key"
            tag="li"
            :to="routeFor(key)"
            class="nav-item"
            active-class="active"
          >
            <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ key }}</a>
          </router-link>
        </template>
        <template v-else>
          <router-link tag="li" :to="{ name: 'Events' }" class="nav-item" active-class="active">
            <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('events.heading') }}</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'DonateForm' }" class="nav-item" active-class="active">
            <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('donate.title') }}</a>
          </router-link>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {}
    },
    computed: {
      navKeys() {
        try {
          if (window && window.TRELLO_STORE) {
            return Object.keys(window.TRELLO_STORE || {});
          }
        } catch (e) {}
        return [];
      }
    },
    methods: {
      routeFor(key) {
        if (!key) return { name: 'Splash' };
        const lower = String(key).toLowerCase();
        if (lower === 'upcoming events' || lower === 'events') return { name: 'Events' };
        if (lower === 'donate' || lower === 'donations') return { name: 'DonateForm' };
        if (lower === 'home' || lower === 'splash') return { name: 'Splash' };
        return { name: key };
      }
    },
    mounted() {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  nav {
    margin-bottom: 2em;
  }

    /* Match donation button (info) colour */
    .btn-menu-c {
      border-color: #17a2b8;
      color: #17a2b8 !important;
    }

    .btn-menu-c:hover,.active a {
      background-color: #17a2b8;
      border-color: #17a2b8;
      color: white !important;
    }

</style>
