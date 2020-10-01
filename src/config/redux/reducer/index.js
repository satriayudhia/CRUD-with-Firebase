//Inisialisasi state global awal
const initState = {
    popup: false,
    isLogin: false,
    isLoading: false,
    user: {},
    notes: []
}

//Kondisi dispatch action akan dijalankan berdasarkan action.type nya
const reducer = (state = initState, action) => {
    if(action.type === 'CHANGE_POPUP') {
        return {
            ...state,
            popup: action.value
        }
    }
    if(action.type === 'CHANGE_ISLOGIN') {
        return {
            ...state,
            isLogin: action.value
        }
    }
    if(action.type === 'CHANGE_USER') {
        return {
            ...state,
            user: action.value
        }
    }
    if(action.type === 'CHANGE_LOADING') {
        return {
            ...state,
            isLoading: action.value
        }
    }
    if(action.type === 'SET_NOTES') {
        return {
            ...state,
            notes: action.value
        }
    }
    return state;
}

//Export class reducer
export default reducer;