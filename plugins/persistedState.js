// 쿠키 플러그인

import createPersistedState from "vuex-persistedstate";
import * as Cookies from 'js-cookie';
import cookie from "cookie";


export default ({store, req}) => {

  createPersistedState({

    //paths: ["example"] => vuex-persistedstate의 옵션
    //path 배열 안에 store들만 저장하겠다는 표현.
    paths: ["store"],

    storage: {

      getItem: (key) => {
        if(process.server){
          console.log(req.headers.cookie);
          const parsedCookies = cookie.parse(req.headers.cookie);
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },

      setItem: (key, values) =>
        Cookies.set(key, values, { expires: 365, secure: false }),


      removeItem: (key) => Cookies.remove(key)

    }

  })

}
