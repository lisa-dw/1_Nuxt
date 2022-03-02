export const state = () => ({

  User : {
    userId: 'useruser1',
    Name: '유저1입니당',
    phone: '01029292929',
    zip: '12729',
    address: '서울시 어쩌구 저쩌구',
    subAddress: '어딘가 어쩌구 저쩌구',
  }

})


export const mutations = {

  // login(state, payload){
  //
  //   console.log(payload)
  //
  //   state.userId = payload.user.userId
  //   state.userName = payload.user.name
  // },

}

export const getters ={

  getUser: (state) => {
    return state.User
  }

}
