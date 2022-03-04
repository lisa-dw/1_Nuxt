// 구매에 대한 store

export const state = () => ({

  buyLists: [],    // 구매 목록들을 저장할 리스트.
  // buySums: []      // 총 구매수량과 총 결제 금액을 저장할 리스트

})

export const mutations = {

  setBuyList(state, payload) {


    // 1. 만약에 buyLists 배열의 길이가 0보다 크면,
    if(state.buyLists.length > 0)
    {

      // 2. state의 buyLists의 인덱스 중에서, state.buyLists의 productId와 payload의 productId가 같다면,
      //    그 변수를 findProductIndex 에 담고,
      let findProductIndex = state.buyLists.findIndex(buyList => buyList.productId === payload.productId);

      console.log('findProductIndex')
      console.log(findProductIndex)   // 0이면 중복되는 값이 있다는 것, -1이면 중복되는 값이 없다는 것.

      // 3. 그 변수 findProductIndex이 -1이면
      if (findProductIndex === -1 )
        state.buyLists.push(payload)

      // 4. 3번에 해당되지 않고,
      //    변수 findProductIndex 가 undefined가 아니거나, null이 아니면,
      else if(findProductIndex !== undefined || findProductIndex !== null){

        // 5. payload의 productId와 같은 productId를 갖고 있던 state.buyLists의 인덱스의 counts 에
        //    payload의 counts를 더하고, 그 값을 다시 state.buyLists.counsts에 반환한다.
        state.buyLists[findProductIndex].counts = state.buyLists[findProductIndex].counts += payload.counts


      }
    }
    // 1. 만약에 buyLists 배열의 길이가 0이면 실행.
    else {
      state.buyLists.push(payload)
    }

  },


  // 총 구매수량과 총 결제 금액을 저장하는 메서드
  // setBuySum(state, payload){
  //
  //   state.buySums.push(payload)
  //   // state.buySums.sumPay = payload.sumPay
  //   // state.buySums.sumCount = payload.sumCount
  //
  // },


  // delete 메서드
  removeBuyList(state, payload) {

    // 선택 삭제
    for(let i=0; i< payload.length; i++){
      state.buyLists.splice(state.buyLists.indexOf(payload.productId), 1)
    }

  },


  // 구매목록 비우는 메서드
  clearBuyList(state) {
    state.buyLists = []
  }


}

export const actions = {
  addBuyList({commit}, payload) {
    //어쩌구~~~
    commit('setBuyList', payload)
  },
}


export const getters = {

  getBuyList: (state) => {
    return state.buyLists
  },

  getBuyListCount: (state) => {
    return state.buyLists.length
  },

  // getBuySum: (state) => {
  //   return state.buySums
  // },


}
