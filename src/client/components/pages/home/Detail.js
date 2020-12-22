import React, {useState} from 'react'
import moment from 'moment'

export default function Detail(props) {
	const [btnState, setBtnState] = useState('')

	return(
		<div style={styles.container}>
			<div style={{display:'flex', flexDirection: 'column', margin: '1vh 1vw 1vh 1vw'}}>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<p style={styles.titleStyle}>ID:</p>
					<p style={styles.titleStyle1}>{props.selectedPost._id}</p>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<p style={styles.titleStyle}>Category:</p>
					<p style={styles.titleStyle1}>{props.selectedPost.categoria}</p>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<p style={styles.titleStyle}>Title:</p>
					<p style={styles.titleStyle1}>{props.selectedPost.titulo}</p>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<p style={styles.titleStyle}>Content:</p>
					<p style={styles.titleStyle1}>{props.selectedPost.contenido}</p>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<p style={styles.titleStyle}>Date:</p>
					<p style={styles.titleStyle1}>{moment(props.selectedPost.fechaCreacion).format('DD/MM/YYYY')}</p>
				</div>
			</div>
			<div style={{display:'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
				<img
					onMouseOver={()=>setBtnState('close')}
					onMouseOut={()=>setBtnState('')}
					title='Close'
					src='/icons/Close-Icon.png'
					onClick={()=>{props.setSelectedPost(null); props.setToggleSwitch(0)}}
					style={btnState==='close' ? styles.imgStyle1 : styles.imgStyle}
				/>
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		margin: '5vh 0 0 3vw',
		width: '40vw',
		height: '35vh',
		backgroundColor: '#C1C1C1aa',
		border: '0.7vh solid #262626',
		borderRadius: '2vh',
		overflowY: 'auto'
	},
	titleStyle: {
		margin: '0.5vh 0.3vw 0.5vh 0',
		padding: '0 0 0 0',
		fontSize: '2.8vh',
		textDecoration: 'underline'
	},
	titleStyle1: {
		margin: '0.5vh 0 0.5vh 0',
		padding: '0 0 0 0',
		fontSize: '2.65vh'
	},
	imgStyle: {
		height: '5vh',
		margin: '0 2vw 0 0.4vw',
		cursor: 'pointer',
		transition: '0.3s'
	},
	imgStyle1: {
		height: '6vh',
		margin: '0 2vw 0 0.4vw',
		cursor: 'pointer',
		transition: '0.3s'
	}
}