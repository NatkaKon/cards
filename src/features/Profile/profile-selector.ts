import { AppRootStateType } from '../../app/store'

export const userId = (state: AppRootStateType) => state.profile._id
