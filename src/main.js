import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';
import App from './App';
import router from './router';
import navigation from '@/components/Navigation';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(VueCookie);

let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();

if (userLang.indexOf('gr') !== -1) {
  userLang = 'gr';
} else {
  userLang = 'en';
}

const cookieLang = Vue.cookie.get('hfxgreeks_language');

if (cookieLang !== undefined || cookieLang !== null) {
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
    info: {
      heading: 'General Information',
      communityHallRental: {
        title: 'Community Hall Reservations',
        text: 'Our Community Hall, at 38 Purcell\'s Cove Road, Halifax, NS, B3N 1R4, is available for rental as a banquet hall. It has a great location, overlooking the waters of Purcell\'s Cove, and it comes with ample parking , and an outdoor patio. Catering is available, if desired. For more information and reservations, call Jimmy Kyriakakis at (902) 830-1829 (cell).',
        contractText: 'Hall rental terms and conditions, rates and contract:',
      },
    },
    contact: {
      heading: 'Contact Us',
    },
    communityDirectory: {
      heading: 'Community Directory',
    }
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
    info: {
      heading: 'Γενική Πληροφόρηση',
      communityHallRental: {
        title: 'Ενοικίαση Κοινοτικής Αίθουσας',
        text: 'Η Κοινοτική αίθουσά μας, που βρίσκεται στη διεύθυνση 38 Purcell\'s Cove Road, Halifax, NS, B3N 1R4, είναι διαθέσιμη για ενοικίαση ως αίθουσα εκδηλώσεων. Τοποθετημένη επάνω στον κολπίσκο του Purcell, με πολύ γραφική θέα του όρμου, διαθέτει επίσης μεγάλο χώρο στάθμευσης και αυλή. Τροφοδοσία διαθέσιμη. Για περισσότερες πληροφορίες και για να κάνετε κράτηση, τηλεφωνήστε στον Τζίμι Κυριακάκη, αριθμός (902) 830-1829 (κινητό).',
        contractText: 'Όροι και προϋποθέσεις ενοικίασης, τιμές και συμβόλαιο:'
      },
    },
    contact: {
      heading: 'Επικοινωνήστε Μαζί Μας',
    },
    communityDirectory: {
      heading: 'Κοινοτικός Τηλ/ός Κατάλογος',
    }
  },
};

const i18n = new VueI18n({
  locale: userLang, // set locale
  fallbackLocale: 'en',
  messages: resourceStore, // set locale messages
});

Vue.component('navigation', navigation);

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  el: '#app',
  render: h => h(App),
});
