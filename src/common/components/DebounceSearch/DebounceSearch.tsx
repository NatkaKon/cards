import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'

import { useAppDispatch } from '../../../app/store'
import { searchPacksByNameAC } from '../../../features/Packs/packsReducer'
import { useDebounce } from '../../../hooks/useDebounce'
import SuperInputText from '../SuperInputText/SuperInputText'

export const DebounceSearch: FC<{ searchQuery?: string }> = props => {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState(props.searchQuery || '')
  const debouncedValue = useDebounce(searchQuery, 500)

  useEffect(() => {
    dispatch(searchPacksByNameAC(debouncedValue))
  }, [debouncedValue])

  const handleOnInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
  }, [])

  return (
    <SuperInputText
      placeholder="Provide your text"
      value={searchQuery}
      onChange={handleOnInputChange}
    />
  )
}
