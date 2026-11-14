import { createApp, reactive } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App';
import router from './router';
import navigation from '@/components/Navigation';
import en from './locales/en';
import gr from './locales/gr';


let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();

if (userLang.indexOf('gr') !== -1) {
  userLang = 'gr';
} else {
  userLang = 'en';
}

const cookiePair = document.cookie
  .split('; ')
  .find(row => row.startsWith('hfxgreeks_language='));
const cookieLang = cookiePair ? cookiePair.split('=')[1] : '';

if (cookieLang && cookieLang.length > 0) {
  userLang = cookieLang;
}

const resourceStore = { en, gr };

const i18n = createI18n({
  legacy: false,
  locale: userLang, // set locale
  fallbackLocale: 'en',
  messages: resourceStore, // set locale messages
});

const trelloStore = reactive({});
window.TRELLO_STORE = trelloStore;
window.TRELLO_LIST_KEYS = {};
let rawTrelloData = null;

// Component registration will be done after app creation

function processData(data, locale) {
  if (!data || !data.lists || !data.cards) {
    console.error('Invalid data structure from Trello API', data);
    return {};
  }
  
  const groupedCards = {};
  const aliases = {};
    const activeLists = data.lists.filter((list) => {
      const names = list.name.split(' - ').map(name => name.trim().toLowerCase());
      return !list.closed || names.includes('donate');
    });

    activeLists.forEach((list) => {
    const names = list.name.split(' - ').map(name => name.trim());
    const localizedName = names.length > 1 ? (names[locale === 'gr' ? 1 : 0] || names[0]) : names[0];
    groupedCards[list.id] = [];
    names.forEach((name) => { aliases[name] = localizedName; });
  });

  data.cards.forEach((card) => {
    if (groupedCards[card.idList]) groupedCards[card.idList].push({ ...card });
  });

  const result = {};
    activeLists.forEach((list) => {
    const names = list.name.split(' - ').map(name => name.trim());
    const localizedName = names.length > 1 ? (names[locale === 'gr' ? 1 : 0] || names[0]) : names[0];
    const cards = groupedCards[list.id]
      .filter(card => !((card.name.startsWith('GR') && locale !== 'gr') || (card.name.startsWith('EN') && locale === 'gr')))
      .map(card => ({
        ...card,
        name: card.name.startsWith('GR ') || card.name.startsWith('EN ') ? card.name.slice(3) : card.name,
      }));
    result[localizedName] = cards;
  });

  window.TRELLO_LIST_KEYS = aliases;
  return result;
}

function updateTrelloLanguage(locale) {
  if (!rawTrelloData) return;
  const localizedStore = processData(rawTrelloData, locale);
  Object.keys(trelloStore).forEach(key => delete trelloStore[key]);
  Object.assign(trelloStore, localizedStore);
}
window.updateTrelloLanguage = updateTrelloLanguage;

let response = fetch('https://trello.com/b/InAnsPaW.json').then(function (response) {
    if (!response.ok) {
      throw new Error(`Trello API error: ${response.status}`);
    }
    return response.json();
  }).then(function(data) {
    rawTrelloData = data;
    updateTrelloLanguage(userLang);
  }).catch(function(error) {
    console.error('Error fetching Trello data:', error);
  }).then(function() {
    const app = createApp(App);
    
    app.component('navigation', navigation);
    app.use(router(window.TRELLO_STORE, window.TRELLO_LIST_KEYS));
    app.use(i18n);
    
    app.mount('#app');
  });
