import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

export default () => {
  const [installations, setInstallations] = useState([])

  useEffect(() => {
    const fetchInstallations = async () => {
      const response = await fetch(`/api/github/installations?token=${localStorage.token}`)
      const data = await response.json()
      setInstallations(data)
    }

    fetchInstallations()
  }, [])

  return (
    <Box marginY={3}>
      <Typography component='h1' variant='h4'>Installations</Typography>
      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>GitHub Org</TableCell>
                <TableCell>Google Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                installations.map(({ id, account }) => (
                  <TableRow key={`installation/${id}`}>
                    <TableCell><a href={`https://github.com/${account.login}`}>{account.login}</a></TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
