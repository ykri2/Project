import 'whatwg-fetch';

export function ActionOne(object){
	console.log(object);

	return function(dispatch){

        dispatch({type: 'GET_ONE_PROGRESSING'})
        
		fetch('https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan', {
			crossDomain: true,
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(object)
		  })
		.then((response) => {
			return response.json()	
			
		}).then((pload) => {

			console.log(pload)
			dispatch({type: 'GET_ONE_FULFILLED', payload: pload})	

		}).catch((err) => {
            	dispatch({type: 'GET_ONE_REJECTED', payload: err})	
		});
	}
}