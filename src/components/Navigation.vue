<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded sticky-top justify-content-around">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse w-auto" id="navbarTogglerDemo01">
      <ul class="navbar-nav">
        <router-link tag="li" :to="{ name: 'Splash' }" class="nav-item" active-class="active">
          <a class="nav-link">{{ $t('splash.title') }}</a>
        </router-link>
        <router-link tag="li" :to="{ name: 'CommunityDirectory' }" class="nav-item" active-class="active">
          <a class="nav-link">{{ $t('communityDirectory.heading') }}</a>
        </router-link>
        <router-link tag="li" :to="{ name: 'Events' }" class="nav-item" active-class="active">
          <a class="nav-link">{{ $t('events.heading') }}</a>
        </router-link>
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
    methods: {
      
    },
    mounted() {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  btn {
    width: 300px;
    display: inline;
  }

  nav {
    margin-bottom: 2em;
    background-color: #80deea;
  }

</style>
