import Vue from 'vue';
import Router from 'vue-router';
import Splash from '@/components/Splash';
import Events from '@/components/Events';
//import CommunityDirectory from '@/components/CommunityDirectory';
import GenericTrello from '@/components/GenericTrello';

Vue.use(Router);

export default function(trello_store) {

  var routes = [
    {
      path: '/events',
      name: 'Events',
      component: Events,
    }
  ]

  var splash_props = {keys: []}

  for (var key of Object.keys(trello_store)) {
    splash_props['keys'].push({
      url: '/' + key.split(' ').join('-'),
      text: key
    })
  }

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

  for (const key_ in splash_props['keys']) {
    key = splash_props['keys'][key_];
    console.log(trello_store[key.text])
    routes.push({
      path: key.url,
      name: key.text,
      component: GenericTrello,
      props: { title: key.text, cards: trello_store[key.text]}
    })
  }

  return new Router({
    routes
  })
}
