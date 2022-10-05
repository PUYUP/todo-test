import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useListItemsQuery } from "./Api"
import ItemCell from './ItemCell'

const ItemList = (props: any) => {
	const { data: items, isLoading } = useListItemsQuery({activityId: props.activityId})

	if (!isLoading) {
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
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
			<CircularProgress />
		</Box>
	)
}

export default ItemList