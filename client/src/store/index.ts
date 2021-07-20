import { createStore, ActionContext } from 'vuex'
import { VuexData, LoginData } from '../types/store';
import { UserRole } from '../types/user';
import { profile } from './modules/profile'

const defaultState: VuexData = {
  jwt: undefined,
  refreshToken: undefined,
  username: undefined,
  roles: []
};

export default createStore({
  state: defaultState,
  actions: {
    login(context: ActionContext<VuexData, VuexData>, args: LoginData) {
      const { jwt, refreshToken, username, roles } = args;
      if (jwt) {
        context.commit('jwt', jwt);
        context.commit('rjwt', refreshToken);
        context.commit('username', username);
        context.commit('roles', roles || []);
      } else {
        context.commit('jwt', undefined);
        context.commit('rjwt', undefined);
        context.commit('username', undefined);
        context.commit('roles', []);
      }
    },
    logout(context: ActionContext<VuexData, VuexData>) {
      context.commit('jwt', undefined);
      context.commit('rjwt', undefined);
      context.commit('username', undefined);
      context.commit('roles', []);
    }
  },
  mutations: {
    jwt: (state: VuexData, jwt: string | undefined) => {
      state.jwt = jwt;
    },
    rjwt: (state: VuexData, refreshToken: string | undefined) => {
      state.refreshToken = refreshToken;
    },
    username: (state: VuexData, username: string | undefined) => {
      state.username = username;
    },
    roles: (state: VuexData, roles: UserRole[] | undefined) => {
      state.roles = roles || [];
    }
  },
  getters: {
    isAuthenticated: (state: VuexData) => !!state.jwt,
    isUserEditor: (state: VuexData) => !!state.roles.find(r => r === UserRole.UserEditor),
    isUserDriver: (state: VuexData) => !!state.roles.find(r => r === UserRole.driver),
    isUserAdmin: (state: VuexData) => !!state.roles.find(r => r === UserRole.admin),
    profileDetails: (state: VuexData) => state
  },
  modules: {
    profile

  }
})
