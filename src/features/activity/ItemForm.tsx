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
import { useCreateItemMutation } from './Api'

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
	const [createItem, status] = useCreateItemMutation()

	const handlePriorityChange = (event: SelectChangeEvent) => {
		setPriority(event.target.value as string)
	}

	React.useEffect(() => {
		if (status.isSuccess) {
			props.onSubmitSuccess(status.data)
		}
	}, [status])

	return (
		<>
			<Formik
				initialValues={{
					title: '',
					priority: priority,
				}}
				validationSchema={Yup.object({
					title: Yup.string().required(),
					priority: Yup.string(),
				})}
				onSubmit={async (values) => {
					await createItem({activity_group_id: props.activityId, ...values})
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
							<Button type="submit" variant="contained">Tambah</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default ItemForm
