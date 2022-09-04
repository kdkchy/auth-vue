import { createStore } from 'vuex'
import authModule from "./auth/index.js";

export default createStore({
  state: {
    isLoading: false
  },
  getters: {
    isLoading(state){
      return state.isLoading
    }
  },
  mutations: {
    itLoading(state){
      state.isLoading = true
    },
    itLoaded(state){
      state.isLoading = false
    }
  },
  actions: {
    itLoading(context){
      context.commit('itLoading')
    },
    itLoaded(context){
      context.commit('itLoaded')
    }
  },
  modules: {
    auth: authModule
  }
})
