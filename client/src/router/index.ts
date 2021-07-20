import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
import Logout from '../components/auth/Logout.vue'
import Profile from '../components/account/Profile.vue'
import store from '../store';
import { UserRole } from '../types/user';
import Country from '../components/Country.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      unauthenticated: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      roles: [UserRole.UserEditor, UserRole.user, UserRole.admin, UserRole.driver]
    }
  },
  {
    path: '/profile2',
    name: 'profile2',
    component: Profile,
    meta: {
      role: UserRole.UserEditor
    }
  },
  {
    path: '/country',
    name: 'Country',
    component: Country,
    meta: {
      roles: [UserRole.UserEditor, UserRole.user, UserRole.admin, UserRole.driver]
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      unauthenticated: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      unauthenticated: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      unauthenticated: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const findOne = function (haystack: UserRole[] | unknown[], arr: UserRole[]) {
  return arr.some(function (v) {
    return haystack.indexOf(v) >= 0;
  });
};

router.beforeEach((to, from, next) => {
  if (to.meta?.unauthenticated) {
    return next();
  }

  const isAuthenticated = store.getters.isAuthenticated;
  if (!isAuthenticated) {
    console.log(`401: not authorized to ${to.fullPath}`);
    return next('/');
  }
  if (to.meta?.roles) {
    if (!findOne(to.meta.roles as UserRole[], store.state.roles)) {
      console.log(`401: not authorized enough to ${to.fullPath}`);
      return next('/');
    }
  } else if (to.meta?.role) {
    const inRole = !!store.state.roles.find(r => r === to.meta.role);
    if (!inRole) {
      console.log(`401: role authorized enough to ${to.fullPath}`);
      return next('/');
    }
  }
  next();
});

export default router
