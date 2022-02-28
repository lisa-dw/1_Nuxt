// 받거나 보내는 데이터 객체의 형식
// mutations의 addProduct 메서드로 저장된 데이터들이
// 여기에 저장되는 것.
export const state = () => ({
  buylist:[
    // id:'',
  ]
})

// 데이터 수정, 저장 등 변환 값은 뮤테이션에서 함
export const actions = {
  //
  addProduct(state, payload){
    console.log('addProduct dispatch run', payload)
    state.buylist.push(payload)
  },
}


// 데이터 수정, 저장 등
export const mutations = {

  // 장바구니의 물품과 수량을 저장.
  addProduct(state, payload){
    console.log('addProduct dispatch run', payload)
    state.buylist.push(payload)
  },

}


// 데이터 가져오기
export const getters = {
  // 해당 state의 buylist의 데이터들을 가져오는 것.
  getProduct:(state) => {
    return state.buylist
  }


  // // 재고 - 주문 수량 연산.
  // calcul:(state.buylist.stock) => {
  //   $outs =
  //   return $outs;
  // },

}
