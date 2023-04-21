import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// ---- PRODUCTS ---- //

export const fetchProducts = () => (dispatch) => {
	dispatch(productsLoading());

		return fetch(baseUrl + "products")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((products) => dispatch(addProducts(products)))
		.catch((error) => dispatch(productsFailed(error.message)));
};

export const productsLoading = () => ({
	type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errMess) => ({
	type: ActionTypes.PRODUCTS_FAILED,
	payload: errMess
});

export const addProducts = (products) => ({
	type: ActionTypes.ADD_PRODUCTS,
	payload: products
});

// ---- STRAINS ---- //

export const fetchStrains = () => (dispatch) => {
	dispatch(strainsLoading());

		return fetch(baseUrl + "strains")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((strains) => dispatch(addStrains(strains)))
		.catch((error) => dispatch(strainsFailed(error.message)));
};

export const strainsLoading = () => ({
	type: ActionTypes.STRAINS_LOADING
});

export const strainsFailed = (errMess) => ({
	type: ActionTypes.STRAINS_FAILED,
	payload: errMess
});

export const addStrains = (strains) => ({
	type: ActionTypes.ADD_STRAINS,
	payload: strains
});

// ---- COMMENTS ---- //

export const fetchComments = () => (dispatch) => {
	return fetch(baseUrl + "comments")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errMess
});

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments
});

export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment
});

export const postComment = (productId, rating, author, text) => (dispatch) => {
	console.log('inside postComment');
	const newComment = {
		productId: productId,
		rating: rating,
		author: author,
		text: text
	};
	newComment.date = new Date().toISOString();

	return fetch(baseUrl + "comments", {
		method: "POST",
		body: JSON.stringify(newComment),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addComment(response)))
		.catch((error) => {
			console.log("post comment", error.message);
			alert("Your comment could not be posted\nError: " + error.message);
		});
};

// ---- STRAIN COMMENTS ---- //

export const fetchStrainComments = () => (dispatch) => {
	return fetch(baseUrl + "strainComments")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((strainComments) => dispatch(addStrainComments(strainComments)))
		.catch((error) => dispatch(strainCommentsFailed(error.message)));
};

export const strainCommentsFailed = (errMess) => ({
	type: ActionTypes.STRAIN_COMMENTS_FAILED,
	payload: errMess
});

export const addStrainComments = (strainComments) => ({
	type: ActionTypes.ADD_STRAIN_COMMENTS,
	payload: strainComments
});

export const addStrainComment = (strainComment) => ({
	type: ActionTypes.ADD_STRAIN_COMMENT,
	payload: strainComment
});

export const postStrainComment = (strainId, strainRating, strainAuthor, strainText) => (dispatch) => {
	console.log('inside postStrainComment');
	const newStrainComment = {
		strainId: strainId,
		rating: strainRating,
		author: strainAuthor,
		text: strainText
	};
	newStrainComment.date = new Date().toISOString();

	return fetch(baseUrl + "strainComments", {
		method: "POST",
		body: JSON.stringify(newStrainComment),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addStrainComment(response)))
		.catch((error) => {
			console.log("post strainComment", error.message);
			alert("Your strainComment could not be posted\nError: " + error.message);
		});
};

// ---- PROMOTIONS ---- //

export const fetchPromotions = () => (dispatch) => {
	dispatch(promotionsLoading());

	return fetch(baseUrl + "promotions")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((promotions) => dispatch(addPromotions(promotions)))
		.catch((error) => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
	type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = (errMess) => ({
	type: ActionTypes.PROMOTIONS_FAILED,
	payload: errMess
});

export const addPromotions = (promotions) => ({
	type: ActionTypes.ADD_PROMOTIONS,
	payload: promotions
});

// ---- PARTNERS ---- //

export const fetchPartners = () => (dispatch) => {
	dispatch(partnersLoading());

	return fetch(baseUrl + "partners")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((partners) => dispatch(addPartners(partners)))
		.catch((error) => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
	type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = (errMess) => ({
	type: ActionTypes.PARTNERS_FAILED,
	payload: errMess
});

export const addPartners = (partners) => ({
	type: ActionTypes.ADD_PARTNERS,
	payload: partners
});

/* ---- CONTACT FORM ---- */

export const postFeedback = (feedback) => {

	
	return fetch(baseUrl + "feedback", {
		method: "POST",
		body: JSON.stringify(feedback),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((feedback) => {
				console.log("Current state is: " + JSON.stringify(feedback));
				alert("Thank You for your Feedback!\nHere's what you entered: " + JSON.stringify(feedback));
		})
		.catch((error) => {
			console.log("post comment", error.message);
			alert("Your comment could not be posted\nError: " + error.message);
		});
};