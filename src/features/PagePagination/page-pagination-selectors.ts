import { AppRootStateType } from '../../app/store'

export const page = (state: AppRootStateType) => state.pagination.page
export const pageCount = (state: AppRootStateType) => state.pagination.pageCount
export const totalPages = (state: AppRootStateType) => state.pagination.totalPages
