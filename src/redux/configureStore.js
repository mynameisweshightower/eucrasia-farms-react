import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Products } from "./products";
import { Strains } from "./strains";
import { StrainComments } from "./strainComments";
import { Comments } from "./comments";
import { Partners } from "./partners";
import { Promotions } from "./promotions";
import { InitialFeedback } from "./forms";
import { Feedback } from "./feedback";

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			products: Products,
			strains: Strains,
			strainComments: StrainComments,
			comments: Comments,
			partners: Partners,
			promotions: Promotions,
			feedback: Feedback,
			...createForms({
				feedbackForm: InitialFeedback
			})
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
