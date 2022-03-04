// 로그인을 하지 않고 사용할 임시 회원 정보.
// => 회원가입이 되어서 회원 목록에 있는 상태.

export const state = () => ({

  user : {
    id: 11,
    userid: 'useruser1',
    name: '유저1입니당',
    phone: '01029292929',
    zip: '22177',
    address: '인천 미추홀구 독배로 443',
    subAddress: ' (숭의동, 삼화복합빌딩)',

    cartNumber : '',   // 카트 번호 // 장바구니번호는 로그인 시에 생성되게도 해야 함.
    buyNumber : '',   // 구매목록 번호

    sumPay : '',       //구매목록의 총 가격
    sumCount : '',     //구매목록의 총 갯수
  },

})

export const mutations ={

  setSum: (state, paylode) => {
    state.user.sumPay = paylode.sumPay
    state.user.sumCount = paylode.sumCount

  },

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
