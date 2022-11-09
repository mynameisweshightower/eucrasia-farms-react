import * as ActionTypes from "./ActionTypes";

export const StrainComments = (state = { errMess: null, strainComments: [] }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_STRAIN_COMMENTS:
			return { ...state, errMess: null, strains: action.payload };
		case ActionTypes.STRAIN_COMMENTS_FAILED:
			return { ...state, errMess: null };

		case ActionTypes.ADD_STRAIN_COMMENT:
			const strain = action.payload;
			return { ...state, comments: state.strains.concat(strain) };
		default:
			return state;
	}
};
