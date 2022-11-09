import * as ActionTypes from "./ActionTypes";

export const Feedback = (
	state = {
		isLoading: true,
		errMess: null,
		feedback: []
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_FEEDBACK:
			return {
				...state,
				isLoading: false,
				errMess: null,
				products: action.payload
			};
		case ActionTypes.FEEDBACK_LOADING:
			return { ...state, isLoading: true, errMess: null, products: [] };
		case ActionTypes.FEEDBACK_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };
		default:
			return state;
	}
};
