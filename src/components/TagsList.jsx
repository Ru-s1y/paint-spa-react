import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid
} from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
// import SearchIcon from '@material-ui/icons/Search';


export default function TagsList () {
  const [tags, setTags] = useState({})

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/tags`
    ).then(response => {
      setTags(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div>
      <Grid>
        {tags.length > 0 &&
          <>
            {tags.map((tag) => {
              return (
                <Chip
                  style={{margin: 1}}
                  // icon={<SearchIcon />}
                  key={tag.id} 
                  label={tag.name} 
                />
              )
            })}
          </>
        }
      </Grid>
    </div>
  )
}