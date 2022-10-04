
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import { useListActivityQuery } from './Api'
import ActivityItem from './ActivityItem'

const ActivityList = () => {
	const { data: activities, isLoading } = useListActivityQuery({email: process.env.MY_EMAIL})

	if (!isLoading) {
		return (
			<>
				<Grid container spacing={3}>
					{activities.data.map((item: any, index: number) => {
						return (
							<ActivityItem {...item} key={index} />
						)
					})}
				</Grid>
			</>
		)
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
			<CircularProgress />
		</Box>
	)
}

export default ActivityList
