import { createRouter, createWebHistory } from 'vue-router';
import Splash from '@/components/Splash';
import Events from '@/components/Events';
//import CommunityDirectory from '@/components/CommunityDirectory';
import GenericTrello from '@/components/GenericTrello';
import DonationForm from '@/components/DonationForm.vue';

export default function(trello_store, trello_aliases = {}) {

  var routes = [
    {
      path: '/events', name: 'Events', component: Events,
    },
    { path: '/donate', name: 'DonateForm', component: DonationForm }
  ]

  var splash_props = {keys: Object.keys(trello_store).map(text => ({
    url: '/' + text.split(' ').join('-'),
    text
  }))}

  routes.push({
    path: '/splash',
    name: 'Splash',
    component: Splash,
    props: splash_props
  });

  routes.push({
    path: '/',
    name: 'Splash_root',
    component: Splash,
    props: splash_props
  });

  const routeKeys = Array.from(new Set([...Object.keys(trello_store), ...Object.keys(trello_aliases)]));
  for (const routeKey of routeKeys) {
    const localizedKey = trello_aliases[routeKey] || routeKey;
    if (routeKey.toLowerCase() === 'donate') {
      routes.push({
        path: '/' + routeKey.split(' ').join('-'),
        name: 'Donate',
        component: DonationForm,
        props: () => ({
          title: window.TRELLO_LIST_KEYS[routeKey] || routeKey,
          cards: window.TRELLO_STORE[window.TRELLO_LIST_KEYS[routeKey] || routeKey] || []
        })
      });
      continue;
    }
    routes.push({
      path: '/' + routeKey.split(' ').join('-'),
      name: routeKey,
      component: GenericTrello,
      props: () => ({
        title: window.TRELLO_LIST_KEYS[routeKey] || routeKey,
        cards: window.TRELLO_STORE[window.TRELLO_LIST_KEYS[routeKey] || routeKey] || []
      })
    })
  }

  return createRouter({
    history: createWebHistory(),
    routes
  })
}
