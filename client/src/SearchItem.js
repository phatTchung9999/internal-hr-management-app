import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const SearchItem = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Search</label>
        <div className='searchInput'>
          <FaSearch aria-hidden='true' />
          <input
              id='search'
              type='text'
              role='searchbox'
              placeholder='Search employees'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type='button'
              aria-label='Clear employee search'
              title='Clear search'
              onClick={() => setSearch('')}
            >
              <MdClose />
            </button>
          )}
        </div>
    </form>
  )
}

export default SearchItem
