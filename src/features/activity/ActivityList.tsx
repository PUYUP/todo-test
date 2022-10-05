
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { useListActivityQuery } from './Api'
import ActivityItem from './ActivityItem'

const ActivityList = () => {
	const { data: activities, isLoading } = useListActivityQuery({email: process.env.MY_EMAIL})

	if (!isLoading) {
		if (activities.data.length > 0) {
			return (
				<>
					<Grid container spacing={3}>
						{activities.data.map((item: any, index: number) => {
							return (
								<ActivityItem data-cy="activity-item" {...item} key={index} />
							)
						})}
					</Grid>
				</>
			)
		} else {
			return (
				<Typography data-cy="activity-empty-state">Belum ada aktifitas</Typography>
			)
		}
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
			<CircularProgress />
		</Box>
	)
}

export default ActivityList
