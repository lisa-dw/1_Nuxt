export const state = () => ({
  val: 0
});


// data 업데이트. 뮤테이션만이 state를 수정할 수 있음.
export const mutations = {
  increment(state) {
    state.val++;
  }
};
