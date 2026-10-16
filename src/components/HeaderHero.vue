<template>
  <div class="splash">
    <section class="bgimage">
      <div class="container h-90 d-flex justify-content-center">
        <div class="jumbotron header-div">
          <h1 class="display-3 hero-text">{{ displayedTitle || $t('splash.mainTitle') }}</h1>
          <br />
          <nav class="nav flex-column flex-md-row">
            <router-link :to="{ name: 'Splash' }" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('splash.title') }}</router-link>
            <router-link :to="routeFor(displayedTitle)" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ displayedTitle || $t('splash.title') }}</router-link>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HeaderHero',
  props: ['title','keys'],
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
    renderKeys() {
      if (this.keys && Array.isArray(this.keys) && this.keys.length) return this.keys.map(k => k.text || k);
      try {
        if (window && window.TRELLO_STORE) return Object.keys(window.TRELLO_STORE || {});
      } catch (e) {}
      return [];
    }
    ,
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
    },
    routeFor(key) {
      if (!key) return { name: 'Splash' };
      const lower = String(key).toLowerCase();
      if (lower === 'upcoming events' || lower === 'events') return { name: 'Events' };
      if (lower === 'donate' || lower === 'donations') return { name: 'DonateForm' };
      if (lower === 'home' || lower === 'splash') return { name: 'Splash' };
      return { name: key };
    }
  }
}
</script>

<style scoped>
/* Reuse the styling from Splash; scoped to this component */
.hero-text { font-size: 2em; }
.header-div { margin-top: 18%; }
.btn-menu-c { border-color: #17a2b8; color: #17a2b8; }
.btn-menu-c:hover { background-color: #17a2b8; border-color: #17a2b8; }
.jumbotron .nav { display:flex; flex-wrap:wrap; gap:0; justify-content:center; }
.jumbotron .nav .nav-link { margin: 0 0 6px 0; }
</style>
