import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Layout from "../../components/Layout"
import ItemForm from '../../features/activity/ItemForm';
import ItemList from '../../features/activity/ItemList';
import { useRetrieveActivityQuery } from '../../features/activity/Api';

const ActivityPage = (props: any) => {
	const { id: activityId } = props.query
	const {data: activity, isLoading} = useRetrieveActivityQuery(activityId)
	const [openItemEditor, setOpenItemEditor] = React.useState<boolean>(false)

	const handleAddItem = () => {
		setOpenItemEditor(true)
	}

	const handleCloseEditor = () => {
		setOpenItemEditor(false)
	}

	const handleSubmitSuccess = (item: any) => {
		setOpenItemEditor(false)
	}

	return (
		<>
			<Head>
				<title>Aktifitas</title>
			</Head>

			<Layout>
				<Grid data-cy="activity-heading" container>
					<Grid item>
						<Typography component="h3" fontWeight={700} fontSize={20}>
							{activity?.title}
						</Typography>
					</Grid>

					<Grid item marginLeft={'auto'}>
						<Button variant="contained" onClick={handleAddItem}>Tambah Item</Button>
					</Grid>
				</Grid>

				<Box>
					<ItemList activityId={activityId} />
				</Box>
			</Layout>

			<Dialog open={openItemEditor} onClose={handleCloseEditor} fullWidth maxWidth="xs">
				<DialogTitle>
					<Grid container>
						<Grid item>Tambah Item</Grid>
						<Grid item marginLeft="auto" textAlign="right"><Button onClick={handleCloseEditor}>Cancel</Button></Grid>
					</Grid>
				</DialogTitle>

				<DialogContent>
					<Box paddingTop={1}>
						<ItemForm onSubmitSuccess={handleSubmitSuccess} activityId={activityId} />
					</Box>
				</DialogContent>
			</Dialog>
		</>
	)
}

ActivityPage.getInitialProps = ({ query }: any) => {
	return { query }
}

export default ActivityPage