import { csrfFetch } from "./csrf";

// Constants
const GET_REVIEWS = 'reviews/GET_REVIEWS'

const CREATE_REVIEW = 'reviews/CREATE_REVIEWS'

const DELETE_REVIEW = 'reviews/DELETE'


// Action Reducers
export const getReviewsbySpotId = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const deleteReviews = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

// Thunk Actions
export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const spotReviews = await response.json();
        // console.log('spotReviews: ---> ', spotReviews)
        dispatch(getReviewsbySpotId(spotReviews))
        return spotReviews
    }
}

export const thunkCreateReviews = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const newReview = await response.json();
        console.log('thunkCreateReviews newReview: ', newReview)
        dispatch(createReview(newReview))
    }
}

// Initial State
const initialState = {}

// Reducer
export default function reviewsReducer(state = initialState, action) {
    const newState = { ...state }

    switch (action.type) {
        case GET_REVIEWS:
            // console.log('reviewReducer NEWSTATE: -------->', newState)
            // console.log('reviewsReducer action.reviews', action.reviews.Reviews)
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        case CREATE_REVIEW:
            console.log('review Reducer action.review --->', action.review)

        default:
            return state
    }
}