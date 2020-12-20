import React, {useState, useEffect} from 'react'
import {apiAddress} from '../../../ipConfig'

export default function Edit(props) {
	const [warning, setWarning] = useState(false)
	const [btnState, setBtnState] = useState('')

	function handleEdit() {
		if (props.selectedPost.titulo==='' || props.selectedPost.contenido==='') {
			setWarning(true)
		}
		else {
			fetch(`${apiAddress}/`,{
				method: 'put',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					_id: props.selectedPost._id,
					titulo: props.selectedPost.titulo,
					contenido: props.selectedPost.contenido,
					categoria: props.selectedPost.categoria
				})
			})
			.then(res => res.json())
			.then(data => {
				alert(data.body.status)
				props.setSelectedPost(null)
				props.setToggleSwitch(0)
				props.handleFetch()
			})
			.catch(err => console.error(err))
		}
	}

	function handleClose() {
		props.setSelectedPost(null)
		props.setToggleSwitch(0)
	}

	return(
		<div style={styles.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh'}}>
				<p style={styles.titleStyle}>Title</p>
			</div>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<input
					type='text'
					value={props.selectedPost.titulo}
					onChange={e => props.setSelectedPost({...props.selectedPost, titulo: e.target.value})}
					style={styles.inputStyle}
				/>
			</div>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh'}}>
				<p style={styles.titleStyle}>Content</p>
			</div>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<textarea
					type='text'
					value={props.selectedPost.contenido}
					onChange={e => props.setSelectedPost({...props.selectedPost, contenido: e.target.value})}
					style={styles.areaInputStyle}
				/>
			</div>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh'}}>
				<p style={styles.titleStyle}>Category</p>
			</div>
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
				<button
					onClick={()=>props.setSelectedPost({...props.selectedPost, categoria: 'X'})}
					style={props.selectedPost.categoria==='X' ? styles.btnCategory1 : styles.btnCategory}
				>X</button>
				<button
					onClick={()=>props.setSelectedPost({...props.selectedPost, categoria: 'Y'})}
					style={props.selectedPost.categoria==='Y' ? styles.btnCategory1 : styles.btnCategory}
				>Y</button>
				<button
					onClick={()=>props.setSelectedPost({...props.selectedPost, categoria: 'Z'})}
					style={props.selectedPost.categoria==='Z' ? styles.btnCategory1 : styles.btnCategory}
				>Z</button>
			</div>
			{warning ?
				<div style={styles.warningFrameStyle}>
					<p style={styles.warningTextStyle}>Invalid Inputs...</p>
					<img
						onClick={()=>setWarning(false)}
						title='Ok!'
						src='/icons/Close-Icon.png'
						style={styles.imgStyle}
					/>
				</div>
			:
			<div style={styles.btnContainer}>
				<img
					onMouseOver={()=>setBtnState('update')}
					onMouseOut={()=>setBtnState('')}
					onClick={()=>handleEdit()}
					title='Update'
					src='/icons/Update-Icon.png'
					style={btnState==='update' ? styles.imgStyle1 : styles.imgStyle}
				/>
				<img
					onMouseOver={()=>setBtnState('close')}
					onMouseOut={()=>setBtnState('')}
					onClick={()=>handleClose()}
					title='Close'
					src='/icons/Close-Icon.png'
					style={btnState==='close' ? styles.imgStyle1 : styles.imgStyle}
				/>
			</div>
			}
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		margin: '5vh 0 0 3vw',
		width: '40vw',
		height: '70vh',
		backgroundColor: '#C1C1C1aa',
		border: '0.7vh solid #262626',
		borderRadius: '2vh'
	},
	titleStyle: {
		margin: '0.5vh 0 0.5vh 0',
		padding: '0 0 0 0',
		fontSize: '2.8vh'
	},
	btnCategory: {
		margin: '0 1vw 0 1vw',
		padding: '1vh 0.8vw 1vh 0.8vw',
		borderRadius: '50%',
		border: '0.4vh double red',
		cursor: 'pointer',
		color: 'red',
		backgroundColor: 'black',
		transition: '0.3s'
	},
	btnCategory1: {
		margin: '0 1vw 0 1vw',
		padding: '1vh 0.8vw 1vh 0.8vw',
		borderRadius: '50%',
		border: '0.4vh double green',
		cursor: 'pointer',
		color: 'green',
		backgroundColor: 'black',
		transition: '0.3s'
	},
	inputStyle: {
		width: '80%',
		padding: '1vh 0.5vw 1vh 0.5vw',
		fontSize: '2.5vh',
		borderRadius: '1.5vh',
		border: 'none'
	},
	areaInputStyle: {
		width: '90%',
		height: '30vh',
		resize: 'none',
		padding: '1vh 0.5vw 1vh 0.5vw',
		fontSize: '2.6vh',
		borderRadius: '1.5vh',
		border: 'none'
	},
	imgStyle: {
		height: '5vh',
		margin: '0 0 0 0',
		cursor: 'pointer',
		transition: '0.3s'
	},
	imgStyle1: {
		height: '6vh',
		margin: '0 0 0 0',
		cursor: 'pointer',
		transition: '0.3s'
	},
	warningTextStyle: {
		margin: '0 0 0 0',
		padding: '0 0 0 2vw',
		fontSize: '3.5vh',
		color: 'black'
	},
	warningFrameStyle: {
		display: 'flex',
		margin: '1.5vh 2vw 0 2vh',
		alignItems: 'center',
		padding: '1vh 0 1vh 0',
		justifyContent: 'space-between',
		backgroundColor: '#FD4D4Daa',
		border: '0.8vh double black',
		borderRadius: '2vh'
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: '2vh 0 0 2vw',
		height: '7vh',
		width: '7vw'
	}
}