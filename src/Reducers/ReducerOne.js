
const initialState = {
    contents: [],
    fetching: false,
    fetched: false,
    error: null,
}


export default function reducer(state=initialState, action){
   switch(action.type){

      case "GET_ONE_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "GET_ONE_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "GET_ONE_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            contents: action.payload
         }
      } default: return state;
   }


}
