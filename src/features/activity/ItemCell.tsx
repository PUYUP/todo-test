import * as React from 'react';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { red, orange, grey, green } from '@mui/material/colors'
import { useDeleteItemMutation, useUpdateItemMutation } from './Api';
import Swal from 'sweetalert2'
import ItemForm from './ItemForm';

const ItemCell = (props: any) => {
	const [updateItem] = useUpdateItemMutation()
	const [deleteItem] = useDeleteItemMutation()
	const [active, setActive] = React.useState(!props.is_active)
	const [openItemEditor, setOpenItemEditor] = React.useState<boolean>(false)

	const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActive(event.target.checked)
		updateItem({id: props.id, is_active: !event.target.checked})
	}

	const handleDelete = () => {
		Swal.fire({
			title: 'Apakah Anda Yakin?',
			text: "Item akan terhapus permanen.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, Hapus!'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteItem(props.id)
			}
		})
	}

	const handleEdit = () => {
		setOpenItemEditor(true)
	}

	const handleCloseEditor = () => {
		setOpenItemEditor(false)
	}

	const handleSubmitSuccess = (item: any) => {
		setOpenItemEditor(false)
	}

	let priorityColor = ''

	switch (props.priority) {
		case 'very-high':
			priorityColor = red[600]
			break;
		case 'high':
			priorityColor = orange[500]
			break;
		case 'normal':
			priorityColor = grey[500]
			break;
		case 'low':
			priorityColor = green[400]
			break;
		default:
			priorityColor = green[700]
	}

	return (
		<>
			<Card sx={{ width: '100%', marginBottom: 2 }}>
				<CardContent>
					<Grid container alignItems={'center'}>
						<Grid item><Checkbox data-cy="activity-item-mark-done" name={`is-active-${props.id}`} onChange={handleActiveChange} checked={active} /></Grid>
						<Grid item data-cy="activity-item-title" paddingLeft={1} sx={{ display: 'flex', alignItems: 'center' }}>
							<CircleIcon sx={{ marginRight: 1, color: priorityColor }} />
							<span>{props.title}</span>
						</Grid>
						<Grid item marginLeft={'auto'}>
							<IconButton data-cy="activity-item-delete" color="error" onClick={handleDelete}>
								<DeleteIcon />
							</IconButton>
							<IconButton data-cy="todo-edit-button" onClick={handleEdit} sx={{ marginLeft: 2 }}>
								<EditIcon />
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Dialog open={openItemEditor} onClose={handleCloseEditor} fullWidth maxWidth="xs">
				<DialogTitle>
					<Grid container>
						<Grid item>Rubah Item</Grid>
						<Grid item marginLeft="auto" textAlign="right"><Button onClick={handleCloseEditor}>Cancel</Button></Grid>
					</Grid>
				</DialogTitle>

				<DialogContent>
					<Box paddingTop={1}>
						<ItemForm data-cy="activity-item-form" onSubmitSuccess={handleSubmitSuccess} item={props} />
					</Box>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default ItemCell