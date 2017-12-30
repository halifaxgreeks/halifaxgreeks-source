import Vue from 'vue';
import Router from 'vue-router';
import Splash from '@/components/Splash';
import Events from '@/components/Events';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash,
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
    },
  ],
});
