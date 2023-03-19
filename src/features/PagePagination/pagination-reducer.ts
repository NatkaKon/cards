const initialState = {
  page: 1,
  pageCount: 4,
  totalPages: 0,
}

export const paginationReducer = (
  state: InitialStateType = initialState,
  action: PaginationActionsType
) => {
  switch (action.type) {
    case 'SET-PAGINATION-DATA':
      return { ...state, ...action.data }
    case 'SET-CURRENT-PAGE':
      return { ...state, page: action.page }
    case 'SET-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'RESET-PAGINATION':
      return { page: 1, pageCount: 0, totalPages: 4 }
    default:
      return state
  }
}

// actions
export const setPaginationDataAC = (data: InitialStateType) =>
  ({
    type: 'SET-PAGINATION-DATA',
    data,
  } as const)
export const setCurrentPageAC = (page: number) =>
  ({
    type: 'SET-CURRENT-PAGE',
    page,
  } as const)
export const setPageCountAC = (pageCount: number) =>
  ({
    type: 'SET-PAGE-COUNT',
    pageCount,
  } as const)
export const resetPaginationAC = () =>
  ({
    type: 'RESET-PAGINATION',
  } as const)

//types
type InitialStateType = typeof initialState
export type PaginationActionsType =
  | ReturnType<typeof setPaginationDataAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof resetPaginationAC>
