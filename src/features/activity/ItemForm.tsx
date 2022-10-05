import * as React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { useCreateItemMutation, useUpdateItemMutation } from './Api'

const LEVELS = [
	{
		id: 'very-high',
		label: 'Very High',
	},
	{
		id: 'high',
		label: 'High',
	},
	{
		id: 'normal',
		label: 'Normal',
	},
	{
		id: 'low',
		label: 'Low',
	},
	{
		id: 'very-low',
		label: 'Very Low',
	},
]

const ItemForm = (props: any) => {
	const [priority, setPriority] = React.useState<string>('very-high')
	const [createItem, createStatus] = useCreateItemMutation()
	const [updateItem, updateStatus] = useUpdateItemMutation()
	const { item } = props

	const handlePriorityChange = (event: SelectChangeEvent) => {
		setPriority(event.target.value as string)
	}

	React.useEffect(() => {
		if (updateStatus.isSuccess || updateStatus.isSuccess) {
			props.onSubmitSuccess(createStatus.data | updateStatus.data)
		}
	}, [createStatus, updateStatus])

	React.useEffect(() => {
		if (item) {
			setPriority(item.priority)
		}
	}, [item])

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{
					title: item ? item.title : '',
					priority: item ? item.priority : priority,
				}}
				validationSchema={Yup.object({
					title: Yup.string().required(),
					priority: Yup.string(),
				})}
				onSubmit={async (values) => {
					if (item) {
						// edit
						await updateItem({
							...values,
							id: item.id,
							priority: priority,
						})
					} else {
						// add
						await createItem({
							...values,
							activity_group_id: props.activityId, 
							priority: priority,
						})
					}
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
				}) => (
					<Form>
						<FormControl fullWidth sx={{ marginBottom: 4 }}>
						<TextField
							name="title"
							label={"Item Name"}
							placeholder={"eg: Buy snack"}
							required={true}
							value={values.title}
							onChange={handleChange}
							size={'small'}
							error={touched.title && Boolean(errors.title)}
							helperText={touched.title && errors.title?.toLocaleString()}
						/>
						</FormControl>

						<FormControl fullWidth sx={{ marginBottom: 4 }}>
							<InputLabel>Level</InputLabel>
							<Select
								name='priority'
								value={priority}
								label="Level"
								size={'small'}
								onChange={handlePriorityChange}
							>
								{LEVELS.map((level: any, index: number) => {
									return (
										<MenuItem key={index} value={level.id}>{level.label}</MenuItem>
									)
								})}
							</Select>
						</FormControl>

						<Box textAlign={'center'}>
							<Button type="submit" variant="contained">
								{item ? 'Update' : 'Tambah'}
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default ItemForm
