<template>
  <div class="community-directory bgimage blurred">
    <div class="container container-small">
      <div class="list-group">
        <div v-for="card in localizedCards" :key="card.id" class="single-card">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ card.name }}</h5>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <div class="mb-1" v-html="descriptionHtml(card.desc)"></div>
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
    computed: {
      localizedCards() {
        this.$i18n.locale;
        const key = window.TRELLO_LIST_KEYS[this.title] || this.title;
        return window.TRELLO_STORE[key] || this.cards;
      }
    },
    mounted() {
      this.$forceUpdate();
    },
    methods: {
      descriptionHtml(description) {
        const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        }[character]));

        return String(description || '').replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, label, target) => {
          if (/^(javascript|data):/i.test(target)) return escapeHtml(label);
          const href = /^static\//i.test(target) ? `/${target}` : target;
          return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-heading {
    padding-bottom: 20px;
  }
</style>
