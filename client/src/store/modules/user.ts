
import { ActionContext, Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import { VuexData, LoginData } from '../../types/store';
import { UserRole } from '../../types/user';
import { ProfileState, MainState } from "@/types/profile";

export const state: VuexData = {
  id: undefined,
  jwt: undefined,
  refreshToken: undefined,
  username: undefined,
  roles: []
}
const mutations: MutationTree<VuexData> = {
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
}

const actions: ActionTree<VuexData, MainState> = {
  login(context: ActionContext<VuexData, MainState>, args: LoginData) {
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
  logout(context: ActionContext<VuexData, MainState>) {
    context.commit('jwt', undefined);
    context.commit('rjwt', undefined);
    context.commit('username', undefined);
    context.commit('roles', []);
  }
}

const getters: GetterTree<VuexData, MainState> = {

  isAuthenticated: (state: VuexData) => !!state.jwt,
  isUserEditor: (state: VuexData) => !!state.roles.find(r => r === UserRole.UserEditor),
  isUserDriver: (state: VuexData) => !!state.roles.find(r => r === UserRole.driver),
  isUserAdmin: (state: VuexData) => !!state.roles.find(r => r === UserRole.admin),
  profileDetails: (state: VuexData) => state

}
const namespaced: boolean = true

export const user: Module<VuexData, MainState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
}


//}
//e//xport default profile