<template>
  <nav class="navbar navbar-light column sticky-top" style="background-color: #e3f2fd;">
    <form class="form-inline d-flex justify-content-around">
      <router-link :to="{ name: 'Splash' }" active-class="active" class="nav-item nav-link">Home</router-link>
      <router-link :to="{ name: 'CommunityDirectory' }" active-class="active" class="nav-item nav-link">Community Directory</router-link>
      <router-link :to="{ name: 'Information' }" active-class="active" class="nav-item nav-link">Info</router-link>
      <router-link :to="{ name: 'Contact' }" active-class="active" class="nav-item nav-link">Contact</router-link>
      <router-link :to="{ name: 'Events' }" active-class="active" class="nav-item nav-link">Events</router-link>
    </form>
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
  }

</style>
