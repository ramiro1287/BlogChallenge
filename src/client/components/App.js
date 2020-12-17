import React from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import NavBar from './NavBar'
import Home from './pages/Home'
import Create from './pages/Create'
import NotFound from './pages/NotFound'

export default function App() {

	return(
		<HashRouter>
			<div style={styles.mainContainer}>
				<NavBar />
				<div style={styles.bodyContainer}>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/create' exact component={Create} />
						<Route path='*' component={NotFound} />
					</Switch>
				</div>
			</div>
		</HashRouter>
	)
}

const styles = {
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		backgroundColor: '#DBDDF7aa'
	},
	bodyContainer: {
		display: 'flex',
		width: '100%',
		height: '100%'
	}
}