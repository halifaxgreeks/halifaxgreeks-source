import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueI18n);

let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();

if (userLang.indexOf('gr') !== -1) {
  userLang = 'gr';
} else {
  userLang = 'en';
}

const resourceStore = {
  en: {
    splash: {
      mainTitle: 'St. George\'s Greek Orthodox Church and Community Centre',
      commHallRent: 'Community Hall Rental',
      bylaws: 'Bylaws',
      contactinfo: 'Contact Info',
      announcements: 'Misc Announcements',
      toggle: 'Αλλαγή Γλώσσας',
      events: 'Upcoming Events',
    },
    events: {
      heading: 'Upcoming Events',
    },
  },

  gr: {
    splash: {
      mainTitle: 'Ελληνική Ορθόδοξη Εκκλησία Αγ. Γεωργίου και Κοινοτικό Κέντρο',
      commHallRent: 'Ενοικίαση Κοινοτικής Αίθουσας',
      bylaws: 'Εσωτερικοί Κανονισμοί',
      contactinfo: 'Πληροφορίες Επικοινωνίας',
      announcements: 'Ανακοινώσεις',
      toggle: 'Switch to English',
      events: 'Προσεχείς Εκδηλώσεις',
    },
    events: {
      heading: 'Προσεχείς Εκδηλώσεις',
    },
  },
};

const i18n = new VueI18n({
  locale: userLang, // set locale
  fallbackLocale: 'en',
  messages: resourceStore, // set locale messages
});

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  el: '#app',
  render: h => h(App),
});
