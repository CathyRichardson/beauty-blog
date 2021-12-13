
const initialState = {
    recommendedProducts: [] // array of {prodName, yesCount, noCount}
}

// action types
const SAVE_RECOMMENDED_DATA = "SAVE_RECOMMENDED_DATA";
const CLEAR_RECOMMENDED_DATA = "CLEAR_RECOMMENDED_DATA";

// action creators
export function saveRecommendedData(data) {
    return {
        type: SAVE_RECOMMENDED_DATA,
        payload: data
    }
}

export function clearRecommendedData() {
    return {
        type: CLEAR_RECOMMENDED_DATA
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_RECOMMENDED_DATA:
            return {
                ...state,
                recommendedProducts: action.payload
            }
        case CLEAR_RECOMMENDED_DATA:
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}