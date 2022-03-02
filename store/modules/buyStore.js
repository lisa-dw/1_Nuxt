const buyStore = {
  state: {
    buylist: [
      {
        productName: '',
        price:'',
        count:''
      },
    ]
  },

  getters:{
    getBuy: state => state.buylist

  },

  mutation: {

    setBuy: (state, payload) => {
      // console.log('buy mutation start', payload)
      // state.buylist = payload
      //
      // state.buylist[0].productName = payload.productName
      // state.buylist[0].price = payload.price
      // state.buylist[0].count = payload.count
      // console.log(state)
    }

  },


  actions:{
    buyAc : (state, payload) => {
      console.log(payload, state.state.buylist)
      state.state.buylist.push(payload)
      // state.buylist[0].productName = payload.productName
      // state.buylist[0].price = payload.price
      // state.buylist[0].count = payload.count
      // commit('setBuy', payload, {root : true})
    }
  }

}

export default buyStore
