

export const state = () => ({
  userId: '',
  userName: '',
})

export const mutations = {

  login(state, payload){

    console.log(payload)

    state.userId = payload.user.userId
    state.userName = payload.user.name
  },

}

// export default userStore
