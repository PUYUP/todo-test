import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useListItemsQuery } from "./Api"
import ItemCell from './ItemCell'

const ItemList = (props: any) => {
	const { data: items, isLoading } = useListItemsQuery({activityId: props.activityId})

	if (!isLoading) {
		if (items.data.length > 0) {
			return (
				<>
					<Box paddingTop={3}>
						{items.data.map((item: any, index: number) => {
							return (
								<ItemCell data-cy="activity-cell" {...item} key={index} />
							)
						})}
					</Box>
				</>
			)
		} else {
			return (
				<>
					<Typography data-cy="todo-empty-state">Belum ada item</Typography>
				</>
			)
		}
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
			<CircularProgress />
		</Box>
	)
}

export default ItemList