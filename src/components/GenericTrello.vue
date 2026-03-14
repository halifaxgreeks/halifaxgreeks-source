<template>
  <div class="community-directory bgimage blurred">
    <div class="container container-small">
      <h1 class="heading">{{ title }}</h1>

      <navigation></navigation>

      <div class="list-group">
        <div v-for="card in cards" class="single-card">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ card.name }}</h5>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <div class="mb-1" v-html="card.desc"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GenericTrello',
    props: [
      'title',
      'cards'
    ],
    mounted() {
      this.$forceUpdate();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-heading {
    padding-bottom: 20px;
  }
</style>
