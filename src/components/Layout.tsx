import Container from '@mui/material/Container'
import Navbar from "./Navbar"

const Layout = ({ children }: any) => {
	return (
		<>
			<Navbar />
			<Container component="main" maxWidth="md" data-cy="main">{children}</Container>
		</>
	)
}

export default Layout