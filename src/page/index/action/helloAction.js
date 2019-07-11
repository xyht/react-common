import { HELLO } from './types'
import axios from 'axios'

export const getHelloData = () => (dispatch) => {
  axios({
    mothod: 'GET',
    url: 'json/hello.json'
  }).then((resp) => {
    dispatch({
      type: HELLO,
      obj: resp.data
    })
  })
}
