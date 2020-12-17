import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

function NavBar(props) {
	const [mouseStyle, setMouseStyle] = useState('')

	return(
		<div style={styles.navContainer}>
			<Link
				to='/'
				title='Pagina Principal'
				style={{display: 'flex', alignSelf: 'center', margin: '1vh 0 1vh 3vw', textDecoration: 'none', color: 'green'}}
			>
				<h1 style={{margin: '0 0 0 0', padding: '0 0 0 0', color: 'white', fontSize: '8vh'}}>Blog</h1>
			</Link>
			<div style={{display: 'flex', alignItems: 'flex-end', margin: '0 3vw 1vh 0'}}>
				<Link
					to='/create'
					onMouseOut={()=>setMouseStyle('')}
					onMouseOver={()=>setMouseStyle('/create')}
					title='Servicios'
					style={props.history.location.pathname==='/create' ? styles.linkStyle2 : mouseStyle==='/create' ? styles.linkStyle1 : styles.linkStyle}
				>Create Post</Link>
			</div>
		</div>
	)
}
export default withRouter(NavBar)

const styles = {
	navContainer: {
		display: 'flex',
		width: '100%',
		backgroundColor: '#2E2E2E',
		justifyContent: 'space-between',
		height: '12vh',
		boxShadow: '0 4px 8px #7A7A7Aaa'
	},
	linkStyle: {
		margin: '0 0 0 1vw',
		textDecoration: 'none',
		color: 'white',
		padding: '0.5vh 0.8vw 0.7vh 0.8vw',
		borderRadius: '2vw',
		fontSize: '3vh',
		transition: '0.2s'
	},
	linkStyle1: {
		margin: '0 0 0 1vw',
		textDecoration: 'none',
		backgroundColor: '#767676aa',
		color: 'white',
		padding: '0.5vh 0.8vw 0.7vh 0.8vw',
		borderRadius: '2vw',
		fontSize: '3vh',
		transition: '0.2s'
	},
	linkStyle2: {
		margin: '0 0 0 1vw',
		textDecoration: 'none',
		color: 'white',
		borderBottom: '0.7vh solid white',
		backgroundColor: '#767676aa',
		padding: '0.5vh 0.8vw 0.7vh 0.8vw',
		borderRadius: '2vw',
		fontSize: '3vh',
		transition: '0.2s'
	}
}