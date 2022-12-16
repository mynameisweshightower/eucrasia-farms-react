import { PRODUCTS } from '../shared/products';
import { COMMENTS } from '../shared/comments';
import { STRAINS } from '../shared/strains';
import { STRAIN_COMMENTS } from '../shared/strainComments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
    products: PRODUCTS,
    comments: COMMENTS,
    strains: STRAINS,
    strainComments: STRAIN_COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};