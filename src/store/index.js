import { createStore } from 'vuex'

export default createStore({
  state: {
    time:2022
  },
  mutations: {
    getTime(state,val){
      state.time = val
    }
  },
  actions: {
    setTime(context,value){
      context.commit('getTime',value) 
    }
  },
  modules: {
  }
})
