import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';
import App from './App';
import router from './router';
import navigation from '@/components/Navigation';
import VueMarkdown from 'vue-markdown'

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(VueCookie);
Vue.use(VueMarkdown);


let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();

if (userLang.indexOf('gr') !== -1) {
  userLang = 'gr';
} else {
  userLang = 'en';
}

const cookieLang = Vue.cookie.get('hfxgreeks_language');

if (cookieLang !== undefined && cookieLang !== null) {
  userLang = cookieLang;
}

var resourceStore = {
  en: {
    splash: {
      mainTitle: 'St. George\'s Greek Orthodox Church and Community Centre',
      toggle: 'Αλλαγή Γλώσσας',
      bulletin: 'Current Monthly Bulletin',
      title: "Home",
    },
    events: {
      heading: 'Upcoming Events',
      allDay: 'All day',
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
      bulletin: 'Τρέχον Μηνιαίο Δελτίο',
      title: "Αρχική Σελίδα",
    },
    events: {
      heading: 'Προσεχείς Εκδηλώσεις',
      allDay: 'Ολοήμερο',
    },
  },
};

const i18n = new VueI18n({
  locale: userLang, // set locale
  fallbackLocale: 'en',
  messages: resourceStore, // set locale messages
});

Vue.component('navigation', navigation);

function processData(data) {
  var resultObject = {};
  var lookupTable = {};
  for (var i = 0; i < data.lists.length; i++) {
    resultObject[data.lists[i].id] = [];
    lookupTable[data.lists[i].id] = data.lists[i].name;
  }
  for (var i = 0; i < data.cards.length; i++) {
    if (data.cards[i].idList in resultObject) {
      resultObject[data.cards[i].idList].push(data.cards[i]);
    }
  }
  for (var i = 0; i < data.lists.length; i++) {
    Object.defineProperty(resultObject, lookupTable[data.lists[i].id],
      Object.getOwnPropertyDescriptor(resultObject, data.lists[i].id));
    delete resultObject[data.lists[i].id];
  }
  window.TRELLO_STORE = filterByLang(resultObject, userLang);
}

function filterByLang(data, userLang) {
  // filter titles by split on hyphen
  // filter texts by ENG/GR prefix + hyphen

  Object.keys(data).forEach(function(ele) {
    var split_key = ele.split(" - ")
    var new_key = ele
    if (userLang == 'gr') {
      new_key = split_key[1]
    } else {
      new_key = split_key[0]
    }

    data[new_key] = data[ele];
    delete data[ele];
  });

  console.log(data)

  Object.keys(data).forEach(function(ele) {
    Object.keys(data[ele]).forEach(function(card_idx) {
      var card = data[ele][card_idx]
      if (card) {
        if (card.name.substring(0, 2) === 'GR' && userLang === 'en') {
          data[ele].splice(card_idx, 1);
        } else if (card.name.substring(0, 2) === 'EN' && userLang === 'gr') {
          data[ele].splice(card_idx, 1);
        }
      }
    })
  })

  Object.keys(data).forEach(function(ele) {
    Object.keys(data[ele]).forEach(function(card_idx) {
      var card = data[ele][card_idx]
      if (card) {
        if (card.name.substring(0, 2) === 'GR' || card.name.substring(0, 2) === 'EN') {
          data[ele][card_idx].name = card.name.slice(3);
        }
      }
    })
  })

  console.log(data)
  return data;

}

const TRELLO_API_KEY = '7be906a758676f380f82ff25075964fe';

let response = fetch('https://api.trello.com/1/board/5a4bdbd67abf0132fd60546a?key='
+ TRELLO_API_KEY + '&cards=open&lists=open').then(function (response) {
    return response.json();
  }).then(function(data) {
    processData(data);
  }).then(function() {
    /* eslint-disable no-new */

    new Vue({
      router: router(window.TRELLO_STORE),
      i18n,
      el: '#app',
      render: h => h(App),
    });
  });
