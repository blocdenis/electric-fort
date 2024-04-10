import React from 'react'

import styles from './SearchInput.module.scss'
import { SearchIcon } from '../icons'

interface SearchInputProps {
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
}) => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder={placeholder} className={styles.input} />
      <SearchIcon className={styles.icon} />
    </div>
  )
}

export default SearchInput
