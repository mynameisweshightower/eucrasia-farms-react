import { PRODUCTS } from '../shared/products';
import { STRAINS } from '../shared/strains';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import { STRAIN_COMMENTS } from '../shared/strainComments';

export const initialState = {
    products: PRODUCTS,
    strains: STRAINS,
    strainComments: STRAIN_COMMENTS,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};