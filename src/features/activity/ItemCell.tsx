import * as React from 'react';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteItemMutation, useUpdateItemMutation } from './Api';

const ItemCell = (props: any) => {
	const [updateItem] = useUpdateItemMutation()
	const [deleteItem] = useDeleteItemMutation()
	const [active, setActive] = React.useState(!props.is_active)

	const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActive(event.target.checked)
		updateItem({id: props.id, is_active: !event.target.checked})
	}

	const handleDelete = () => {
		deleteItem(props.id)
	}

	return (
		<>
			<Card sx={{ width: '100%', marginBottom: 2 }}>
				<CardContent>
					<Grid container alignItems={'center'}>
						<Grid item><Checkbox name={`is-active-${props.id}`} onChange={handleActiveChange} checked={active} /></Grid>
						<Grid item paddingLeft={1}>{props.title}</Grid>
						<Grid item marginLeft={'auto'}>
							<IconButton color="error" onClick={handleDelete}>
								<DeleteIcon />
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	)
}

export default ItemCell