<template>
  <div class="container container-small navbar-container">
    <nav class="navbar navbar-light sticky-top rounded">
      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'Splash' }" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('splash.title') }}</router-link>
          </li>
          <template v-if="navKeys && navKeys.length">
            <li v-for="key in navKeys" :key="key" class="nav-item">
              <router-link :to="routeFor(key)" class="nav-link btn btn-outline-info btn-menu-c rounded-0" active-class="active">{{ key }}</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: 'Events' }" class="nav-link btn btn-outline-info btn-menu-c rounded-0" active-class="active">{{ $t('events.heading') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'DonateForm' }" class="nav-link btn btn-outline-info btn-menu-c rounded-0" active-class="active">{{ $t('donate.title') }}</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
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
    margin: 0 auto 1rem;
    width: 100%;
    background-color: #fff;
    z-index: 1020;
  }

  .navbar-collapse {
    display: block;
  }

  .navbar-nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0;
    width: 100%;
  }

  .nav-link {
    white-space: normal;
    padding-right: 5px;
    padding-left: 5px;
  }

  .btn-menu-c {
      border-color: #17a2b8;
      color: #17a2b8 !important;
  }

    .btn-menu-c:hover,
    .btn-menu-c.active,
    .btn-menu-c.router-link-active,
    .btn-menu-c.router-link-exact-active {
      background-color: #17a2b8;
      border-color: #17a2b8;
      color: white !important;
    }

</style>
