import React, { useState } from 'react'
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Loader from "./Loader";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

export default () => {
  const [webhooks, setWebhooks] = useState([])

  return <Box marginY={3}>
    <Typography component='h1' variant='h4'>Webhooks</Typography>
    <Box mt={2}>
      <Loader url="/api/webhooks" data={webhooks} callback={setWebhooks}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Installation ID</TableCell>
                <TableCell>Repo</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {webhooks.map(({ installation_id, repo, created_at }) => {
                return <TableRow key={created_at}>
                  <TableCell>{installation_id}</TableCell>
                  <TableCell>{repo}</TableCell>
                  <TableCell>{created_at}</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Loader>
    </Box>
  </Box>
}

