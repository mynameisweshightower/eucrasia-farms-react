import * as ActionTypes from "./ActionTypes";

export const StrainComments = (state = { errMess: null, strainComments: [] },	action) => {
	switch (action.type) {
		case ActionTypes.ADD_STRAIN_COMMENTS:
			return { ...state, errMess: null, strainComments: action.payload };
		case ActionTypes.STRAIN_COMMENTS_FAILED:
			return { ...state, errMess: null };

		case ActionTypes.ADD_STRAIN_COMMENT:
			const strainComment = action.payload;
			return { ...state, strainComments: state.strainComments.concat(strainComment)};
		default:
			return state;
	}
};
