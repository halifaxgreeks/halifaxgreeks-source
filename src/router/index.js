import Vue from 'vue';
import Router from 'vue-router';
import Splash from '@/components/Splash';
import Events from '@/components/Events';
import Info from '@/components/Info';
import Contact from '@/components/Contact';
import CommunityDirectory from '@/components/CommunityDirectory';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash_root',
      component: Splash,
    },
    {
      path: '/splash',
      name: 'Splash',
      component: Splash,
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
    },
    {
      path: '/information',
      name: 'Information',
      component: Info,
    },
    {
      path: '/contact-us',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/community-directory',
      name: 'CommunityDirectory',
      component: CommunityDirectory,
    }
  ],
});