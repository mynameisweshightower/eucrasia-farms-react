import * as ActionTypes from "./ActionTypes";

export const Strains = (
	state = {
		isLoading: true,
		errMess: null,
		strains: []
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_STRAINS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				strains: action.payload
			};
		case ActionTypes.STRAINS_LOADING:
			return { ...state, isLoading: true, errMess: null, strains: [] };
		case ActionTypes.STRAINS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };
		default:
			return state;
	}
};