import React, { ChangeEvent, FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { useDebounce } from '../../../hooks/useDebounce'
import SuperInputText from '../SuperInputText/SuperInputText'

type PropsType = {
  searchQuery: string
  searchDebouncedValue: (debouncedValue: string) => void
}

export const DebounceSearch: FC<PropsType> = memo(props => {
  let isFirstRender = useRef(true)

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedValue = useDebounce(searchQuery, 1000)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }

    props.searchDebouncedValue(debouncedValue)
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
