import React from 'react'

const SearchBox = (props) => {
  return (
    <div>
        <input type='text' onChange={event=>props.setLocation(event.target.value)} onKeyPress={props.keyPress} placeholder='Type to search...'/>

    </div>
  )
}

export default SearchBox