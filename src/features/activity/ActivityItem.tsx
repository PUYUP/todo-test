import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useDeleteActivityMutation } from './Api'

const ActivityItem = (props: any) => {
	const router = useRouter()
	const [deleteActivity] = useDeleteActivityMutation()

	const handleItemClick = () => {
		router.push(`/activity/${props.id}`)
	}

	const handleDeleteActivity = () => {
		Swal.fire({
			title: 'Apakah Anda Yakin?',
			text: "Semua item didalamnya ikut terhapus.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, Hapus!'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteActivity(props.id)
			}
		})
	}

	return (
		<Grid item xs={12} sm={6} md={3}>
			<Card sx={{ height: '100%' }}>
				<CardContent sx={{ height: '100%' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column' }} onClick={handleItemClick}>
						<Typography data-cy="activity-title" fontSize={18}>{props.title}</Typography>
						<Typography data-cy="activity-date" fontSize={12} component="div" marginTop={'auto'}>
							{moment(props.created_at).format('MMMM Do YYYY, h:mm:ss a')}
						</Typography>
					</Box>
					
					<Box marginTop={2}>
						<IconButton data-cy="activity-delete" onClick={handleDeleteActivity}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default ActivityItem