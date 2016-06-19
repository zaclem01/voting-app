const users = (state=[], action) => {
	switch(action.type) {
		case 'ADD_USER':
			return [
				...state,
				{}
			];
	}
}