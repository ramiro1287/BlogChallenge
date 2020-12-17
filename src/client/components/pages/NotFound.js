import React from 'react'

export default function NotFound() {

	return(
		<div style={styles.container}>
			<h1 style={{color: 'red'}}>Page Not Found</h1>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
}