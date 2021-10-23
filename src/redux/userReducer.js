
const initialState = {
    id: null,
    username: '',
    isAdmin: ''
}

const SAVE_USER_DATA = "SAVE_USER_DATA";
const CLEAR_USER_DATA = "CLEAR_USER_DATA";

export function saveUserData(user) {
    const { id, username, isAdmin } = user;
    return {
        type: SAVE_USER_DATA,
        payload: { id, username, isAdmin }
    }
}

export function clearUserData() {
    return {
        type: CLEAR_USER_DATA
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_DATA:
            const { id, username, isAdmin } = action.payload;
            return {
                ...state,
                id,
                username,
                isAdmin
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}