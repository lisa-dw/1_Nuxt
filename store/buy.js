export const state = () => ({
  buyList: []
})

export const mutations = {
  setTodo(state, payload) {
    state.buyList.push(payload)
  },
  removeTodo(state, payload) {
    state.buyList.splice(state.buyList.indexOf(payload), 1)
  },
  clearTodo(state) {
    state.buyList = []
  }
}

export const actions = {
  addTodo({commit}, payload) {
    //어쩌구~~~
    commit('setTodo', payload)
  },
}


export const getters = {
  getTodoList: (state) => {
    return state.buyList
  },
  getTodoListCount: (state) => {
    return state.buyList.length
  }
}
