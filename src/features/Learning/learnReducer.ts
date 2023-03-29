const initialState = {
  packName: '',
}

export const learnReducer = (state: InitialStateType = initialState, action: LearnActionsType) => {
  switch (action.type) {
    case 'LEARN/SET-PACK-NAME':
      return { ...state, packName: action.packName }
    default:
      return state
  }
}

//actions
export const setPackNameAC = (packName: string) =>
  ({ type: 'LEARN/SET-PACK-NAME', packName } as const)

// types
type InitialStateType = typeof initialState
export type LearnActionsType = ReturnType<typeof setPackNameAC>
