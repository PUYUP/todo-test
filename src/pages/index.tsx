import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Layout from '../components/Layout'
import ActivityForm from '../features/activity/ActivityForm'
import ActivityList from '../features/activity/ActivityList'

export default function Home() {
  const [openActivityEditor, setOpenActivityEditor] = React.useState<boolean>(false)
  
  const handleAddTodo = () => {
    setOpenActivityEditor(true)
  }

  const handleCloseEditor = () => {
    setOpenActivityEditor(false)
  }

  const handleSubmitSuccess = (item: any) => {
    setOpenActivityEditor(false)
  }

  return (
    <>
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="Simple To Do List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Grid data-cy="activity-heading" container>
          <Grid item>
            <Typography data-cy="activity-title" component="h3" fontWeight={700} fontSize={20}>Activity</Typography>
            <Typography data-cy="activity-subtitle">Daftar aktifitas Anda</Typography>
          </Grid>

          <Grid item marginLeft={'auto'}>
            <Button data-cy="activity-add-button" variant="contained" onClick={handleAddTodo}>Tambah</Button>
          </Grid>
        </Grid>

        <Box paddingTop={2}>
          <ActivityList data-cy="activity-list" />
        </Box>
      </Layout>

      <Dialog open={openActivityEditor} onClose={handleCloseEditor} fullWidth maxWidth="xs">
        <DialogTitle>
          <Grid container>
            <Grid item>Tambah Activity</Grid>
            <Grid item marginLeft="auto" textAlign="right"><Button onClick={handleCloseEditor}>Cancel</Button></Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <Box paddingTop={1}>
            <ActivityForm data-cy="activity-form" onSubmitSuccess={handleSubmitSuccess} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
