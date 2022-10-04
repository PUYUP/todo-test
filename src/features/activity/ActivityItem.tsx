import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import { useRouter } from 'next/router'

const ActivityItem = (props: any) => {
	const router = useRouter()

	const handleItemClick = () => {
		router.push(`/activity/${props.id}`)
	}

	return (
		<Grid item xs={12} sm={6} md={3} onClick={handleItemClick}>
			<Card>
				<CardContent>
					<Typography fontSize={18}>{props.title}</Typography>
					<Typography fontSize={12} component="div">
						{moment(props.created_at).format('MMMM Do YYYY, h:mm:ss a')}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default ActivityItem