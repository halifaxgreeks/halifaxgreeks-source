<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded sticky-top justify-content-around">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse w-auto" id="navbarTogglerDemo01">
      <ul class="navbar-nav">
        <router-link tag="li" :to="{ name: 'Splash' }" class="nav-item" active-class="active">
          <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('splash.title') }}</a>
        </router-link>
        <router-link tag="li" :to="{ name: 'CommunityDirectory' }" class="nav-item" active-class="active">
          <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('communityDirectory.heading') }}</a>
        </router-link>
        <router-link tag="li" :to="{ name: 'Events' }" class="nav-item" active-class="active">
          <a class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('events.heading') }}</a>
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

  nav {
    margin-bottom: 2em;
  }

  .hero-text {
      font-size: 2em;
  }

  .header-div {
      margin-top: 32%;
      margin-left: 10%;
      margin-right: 10%;
  }

  @media (min-width: 770px) {
      :not(.nav .nav-link:last-child) {
          border-right: 0;
      }
  }
  @media (max-width: 770px) {
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
      color: #27ae60 !important;
  }

  .btn-menu-c:hover,.active a {
      background-color: #27ae60;
      border-color: #27ae60;
      color: white !important;
  }

</style>
