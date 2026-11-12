<template>
  <div :class="['jumbotron', 'header-div', { 'header-div-compact': compact }]">
    <h1 class="display-3 hero-text">{{ displayedTitle || $t('splash.mainTitle') }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HeaderHero',
  props: {
    title: [String, Function, Object],
    keys: Array,
    compact: Boolean
  },
  data() {
    return {
      internalTitle: null,
    };
  },
  watch: {
    title(newVal) {
      this.updateInternalTitle(newVal);
    }
  },
  computed: {
    displayedTitle() {
      if (this.internalTitle) return this.internalTitle;
      if (this.title === null || this.title === undefined) return null;
      try {
        if (typeof this.title === 'function') {
          const v = this.title();
          if (v && typeof v.then === 'function') return null;
          return v;
        }
        if (this.title && typeof this.title.then === 'function') return null;
        return String(this.title);
      } catch (e) {
        return String(this.title);
      }
    }
  },
  created() {
    this.updateInternalTitle(this.title);
  },
  methods: {
    updateInternalTitle(t) {
      // Handle functions (e.g. i18n composer), Promises, or direct values
      if (!t && t !== '') {
        this.internalTitle = null;
        return;
      }
      try {
        if (typeof t === 'function') {
          const v = t();
          if (v && typeof v.then === 'function') {
            v.then(res => { this.internalTitle = res; }).catch(() => { this.internalTitle = String(v); });
            return;
          }
          this.internalTitle = v;
          return;
        }
        if (t && typeof t.then === 'function') {
          t.then(res => { this.internalTitle = res; }).catch(() => { this.internalTitle = String(t); });
          return;
        }
        this.internalTitle = t;
      } catch (e) {
        this.internalTitle = String(t);
      }
    }
  }
}
</script>

<style scoped>
.hero-text { font-size: 2em; }
.header-div { margin: 0 0 1rem; }
.header-div-compact { padding: 0.75rem 1.25rem; margin-bottom: 0.75rem; }
.header-div-compact .hero-text { font-size: 1.5rem; }
</style>
