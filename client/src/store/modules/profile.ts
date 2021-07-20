import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import { ProfileState } from "@/types/profile";
import { VuexData } from '@/types/store';
export const state: ProfileState = {
  name: undefined,
  username: undefined,
  roles: [],
  id: undefined
}

const mutations: MutationTree<ProfileState> = {

  setProfile(state, payload: ProfileState) {
    console.log('mu setProfile ' + JSON.stringify(payload))
    //state = payload
    state.username = payload.username;
    state.name = payload.name;
    state.roles = payload.roles;
    state.id = payload.id;
  },
}

const actions: ActionTree<ProfileState, VuexData> = {
  setProfile({ commit }, args: ProfileState) {
    console.log('actions setProfile ' + JSON.stringify(args))
    const { id, name, username } = args;
    if (username && name && id) {
      commit('setProfile', args);
    }
  }

}

const getters: GetterTree<ProfileState, VuexData> = {
  username: ({ username }) => username,
  name: ({ name }) => name,
  roles: ({ roles }) => roles,
  id: ({ id }) => id,
  profile: ({ id, name, roles, username }) => ({
    username: username, id: id, name: name, roles: roles
  })
}
const namespaced = true

export const profile: Module<ProfileState, VuexData> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
}

