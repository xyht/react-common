import { HELLO } from './../action/types'

const initState = {
  items: []
}

const getHelloData = (state, action) => {
  return {
    ...state, items: action.obj.data.hello
  }
}

const helloReducer = (state = initState, action) => {
  switch(action.type){
    case HELLO: return getHelloData(state, action)
    
    default: return state
  }
}

export default helloReducer