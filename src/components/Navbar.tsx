import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Navbar = () => {
	return (
		<>
			<Box data-cy="navbar" paddingTop={5} paddingBottom={5}>
				<Container component="div" maxWidth="md" data-cy="navbar-container">
					<Typography variant='h1' fontSize={25}>To Do List App</Typography>
				</Container>
			</Box>
		</>
	)
}

export default Navbar