export function load({ cookies }) {
	const id = cookies.get('userId');

	if(!id){
		return{
			loggedIn: false
		};
	}
	return{
		loggedIn: true
	};
}