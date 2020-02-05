import React, { useContext, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import SnackbarContext from '../contexts/SnackbarContext'

export default ({ url, data, callback, children }) => {
  const [loading, setLoading] = useState(true)
  const setSnackbar = useContext(SnackbarContext)[1]

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        callback(data)
      } else {
        setSnackbar({ message: 'Something went wrong. Please, try again later', severity: 'error' })
      }
      setLoading(false)
    }

    fetchData()
  }, [url, callback, setSnackbar])

  if (loading) {
    return <Box display='flex' flexDirection='column' alignItems='center' component={Paper} p={4}>
      <CircularProgress />
      <Box mt={2}>
        <Typography variant='button'>
          Loading
        </Typography>
      </Box>
    </Box>
  }

  if (data.length === 0) {
    return <Box display='flex' flexDirection='column' alignItems='center' component={Paper} p={4}>
        <Typography variant='button'>
          No records found
        </Typography>
    </Box>
  }

  return children
}
