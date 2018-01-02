<template>
  <div class="community-directory bgimage blurred">
    <div class="container container-small">
      <h1 class="heading">{{ $t('communityDirectory.heading') }}</h1>

      <div class="list-group">
        <div v-for="card in cards" class="single-card">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ card.name }}</h5>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <p class="mb-1" v-html="card.desc"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const TRELLO_API_KEY = '7be906a758676f380f82ff25075964fe';

  export default {
    name: 'CommunityDirectory',
    data() {
      return {
        cards: [],
      };
    },
    methods: {
      
    },
    mounted() {
      self = this;

      fetch('https://api.trello.com/1/board/5a4bdbd67abf0132fd60546a?key='
      + TRELLO_API_KEY + '&cards=open&lists=open').then(function (response) {
          return response.json();
        }).then(function(data) {
          processData(data);
      });

      function processData(data) {
        var resultObject = {};
        var lookupTable = {};
        
        for (var i = 0; i < data.lists.length; i++) {
          resultObject[data.lists[i].id] = [];
          lookupTable[data.lists[i].id] = data.lists[i].name;
        }

        for (var i = 0; i < data.cards.length; i++) {
          resultObject[data.cards[i].idList].push(data.cards[i]);
        }

        for (var i = 0; i < data.lists.length; i++) {
          Object.defineProperty(resultObject, lookupTable[data.lists[i].id], 
            Object.getOwnPropertyDescriptor(resultObject, data.lists[i].id));
          delete resultObject[data.lists[i].id];
        }

        self.cards = resultObject["Community Directory"];
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-heading {
    padding-bottom: 20px;
  }
</style>
