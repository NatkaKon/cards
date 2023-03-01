const initialState = {
    status: 'loading',
    error:null as string|null
}
type initialStateType = any

export const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case 'xx':
            return state
        default:
            return state
    }
}