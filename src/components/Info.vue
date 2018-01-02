<template>
  <div class="info bgimage blurred">
    <div class="container container-small">
      <h1 class="heading">{{ $t('info.heading') }}</h1>

      <div class="list-group">
        <div class="single-card">
          <div class="list-group-item flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 card-heading">{{ $t('info.communityHallRental.title') }}</h5>
              <p></p>
            </div>
            <p class="mb-1">{{ $t('info.communityHallRental.text') }}</p>
            <small>{{ $t('info.communityHallRental.contractText') }} <a href="static/pdfs/St-Georges-Greek-Hall-Rental-Contract-Jan-2011.pdf">PDF</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Info',
    data() {
      return {
        
      };
    },
    methods: {
      
    },
    mounted() {
    
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-heading {
    padding-bottom: 20px;
  }
</style>
