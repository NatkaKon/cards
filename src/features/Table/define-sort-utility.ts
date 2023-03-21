import { SortOrderType } from './TableHeadWithSorting'

export const defineSortOrder = (orderBy: string, order: SortOrderType): string => {
  // a sort name for server request should be in the form of '0name' or '1name'
  const descOrderBy = '0' + orderBy
  const ascOrderBy = '1' + orderBy

  switch (order) {
    case 'asc':
      return descOrderBy
    case 'desc':
      return ascOrderBy
    default:
      return ''
  }
}
