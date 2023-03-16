import React, { ChangeEvent, FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { useAppDispatch } from '../../../app/store'
import { searchPacksByNameAC } from '../../../features/Packs/packsReducer'
import { useDebounce } from '../../../hooks/useDebounce'
import SuperInputText from '../SuperInputText/SuperInputText'

export const DebounceSearch: FC<{ searchQuery: string }> = memo(props => {
  let isFirstRender = useRef(true)

  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedValue = useDebounce(searchQuery, 1000)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }
    dispatch(searchPacksByNameAC(debouncedValue))
  }, [debouncedValue])

  useEffect(() => {
    setSearchQuery(props.searchQuery)
  }, [props.searchQuery])

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
})
