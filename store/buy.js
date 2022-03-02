export const state = () => ({

  buyLists: []

})

export const mutations = {

  setBuyList(state, payload) {

    // console.log('payload.productId')
    // console.log(payload.productId)
    // console.log('payload.counts')
    // console.log(payload.counts)
    // console.log(state.buyLists)
    // console.log(state.buyLists.length)

    // state.buyLists.push(payload)


    // 1. 만약에 buyLists 배열의 길이가 0이면,
    if(state.buyLists.length > 0)
    {
      // 2. state의 buyLists의 인덱스 중에서, state.buyLists의 productId와 payload의 productId가 같다면,
      //    그 변수를 findProductIndex 에 담고,
      let findProductIndex = state.buyLists.findIndex(buyList => buyList.productId === payload.productId);

      console.log('findProductIndex')
      console.log(findProductIndex)

      // 3. 그 변수 findProductIndex 가 undefined가 아니거나, null이 아니면,
      if(findProductIndex !== undefined || findProductIndex !== null){

        // 4. payload의 productId와 같은 productId를 갖고 있던 state.buyLists의 인덱스의 counts 에
        //    payload의 counts를 더하고, 그 값을 다시 state.buyLists.counsts에 반환한다.
        state.buyLists[findProductIndex].counts = state.buyLists[findProductIndex].counts += payload.counts

      }
      // 2. state의 buyLists의 인덱스 중에서, state.buyLists의 productId와 payload의 productId가 같지 않다면,
      // state.buyLists의 마지막에 payload를 집어넣어라.
      else {
        state.buyLists.push(payload)
      }

    }
    // 1. 만약에 buyLists 배열의 길이가 0이 아니면 실행.
    else {
      state.buyLists.push(payload)
    }

  },


  removeBuyList(state, payload) {
    state.buyLists.splice(state.buyLists.indexOf(payload), 1)
  },


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
    // return state

    return state.buyLists
  },
  getBuyListCount: (state) => {
    return state.buyLists.length
  }
}
