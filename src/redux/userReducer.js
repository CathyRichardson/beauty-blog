
const initialState = {
    id: null,
    username: '',
    isAdmin: ''
}

const SAVE_USER_DATA = "SAVE_USER_DATA";

export function saveUserData(user) {
    const { id, username, isAdmin } = user;
    return {
        type: SAVE_USER_DATA,
        payload: { id, username, isAdmin }
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
        default:
            return state;
    }
}