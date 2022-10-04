import * as React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useCreateActivityMutation } from './Api'

const ActivityForm = (props: any) => {
	const [ createActivity, status ] = useCreateActivityMutation()

	React.useEffect(() => {
		if (status.isSuccess) {
			props.onSubmitSuccess(status.data)
		}
	}, [status])

	return (
		<>
			<Formik
				initialValues={{
					title: ''
				}}
				validationSchema={Yup.object({
					title: Yup.string().required()
				})}
				onSubmit={async (values) => {
					await createActivity({
						...values,
						email: process.env.MY_EMAIL,
					})
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange
				}) => (
					<Form>
						<FormControl fullWidth sx={{ marginBottom: 4 }}>
						<TextField
							name="title"
							label={"Activity Title"}
							placeholder={"eg: Going to zoo"}
							required={true}
							value={values.title}
							onChange={handleChange}
							size={'small'}
							error={touched.title && Boolean(errors.title)}
							helperText={touched.title && errors.title?.toLocaleString()}
						/>
						</FormControl>

						<Box textAlign={'center'}>
							<Button type="submit" variant="contained">Simpan</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default ActivityForm