// 로그인을 하지 않고 사용할 임시 회원 정보.
// => 회원가입이 되어서 회원 목록에 있는 상태.

export const state = () => ({

  user : {
    id: '31',
    userid: 'useruser1',
    name: '유저1입니당',
    phone: '01029292929',
    zip: '22177',
    address: '인천 미추홀구 독배로 443',
    subAddress: ' (숭의동, 삼화복합빌딩)',
    cartNumber : '',   // 카트 번호
    buyNumber : '',   // 구매목록 번호
  },

})

export const mutations ={

  setCartNumber: (state, paylode) => {

    state.user.cartNumber = paylode

  },

  setBuyNumber: (state, paylode) => {

    state.user.buyNumber = paylode

  },

}


export const getters ={

  getUser: (state) => {
    return state.user
  },


}
