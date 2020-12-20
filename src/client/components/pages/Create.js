import React, {useState} from 'react'
import {apiAddress} from '../../ipConfig'

export default function Create(props) {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [warning, setWarning] = useState(false)
	const [btnState, setBtnState] = useState('')

	function inputsValidate() {
		if (title==='' || content==='' || category==='') {setWarning(true)}
		else {
			fetch(`${apiAddress}`,{
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					titulo: title,
					contenido: content,
					categoria: category
				})
			})
			.then(res => res.json())
			.then(data => {
				alert(data.body.status)
				setTitle('')
				setContent('')
				setCategory('')
				props.history.push('/')
			})
			.catch(err => console.error(err))
		}
	}

	return(
		<div style={styles.container}>
			<div style={styles.frame}>
				<div style={styles.frame}>
					<p style={styles.titleStyle}>Title</p>
					<input
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Insert title'
						type='text'
						style={styles.inputStyle}
					/>
				</div>
				<div style={styles.frame}>
					<p style={styles.titleStyle}>Content</p>
					<textarea
						value={content}
						onChange={e => setContent(e.target.value)}
						placeholder='Write a body'
						type='text'
						style={styles.inputAreaStyle}
					/>
				</div>
				<div style={styles.frame}>
					<p style={styles.titleStyle}>Category</p>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
						<button onClick={()=>setCategory('X')} style={category==='X' ? styles.btnCategory1 : styles.btnCategory}>X</button>
						<button onClick={()=>setCategory('Y')} style={category==='Y' ? styles.btnCategory1 : styles.btnCategory}>Y</button>
						<button onClick={()=>setCategory('Z')} style={category==='Z' ? styles.btnCategory1 : styles.btnCategory}>Z</button>
					</div>
				</div>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					{!warning ?
					<img
						onMouseOut={()=>setBtnState('')}
						onMouseOver={()=>setBtnState('add')}
						onClick={()=>inputsValidate(false)}
						title='Create'
						src='/icons/Add-Icon.png'
						style={btnState==='add' ? styles.imgStyle1 : styles.imgStyle}
					/>
					:
					<div style={styles.warningFrameStyle}>
						<p style={styles.warningTextStyle}>Invalid Inputs...</p>
						<img
							onMouseOut={()=>setBtnState('')}
							onMouseOver={()=>setBtnState('close')}
							onClick={()=>setWarning(false)}
							title='Ok!'
							src='/icons/Close-Icon.png'
							style={btnState==='close' ? styles.imgStyle1 : styles.imgStyle}
						/>
					</div>
					}
				</div>
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center'
	},
	frame: {
		display: 'flex',
		margin: '2vh 0 2vh 0',
		flexDirection: 'column'
	},
	titleStyle: {
		margin: '0 0 1vh 0',
		padding: '0 0 0 0',
		fontSize: '4vh',
		textAlign: 'center'
	},
	inputStyle: {
		margin: '0 0 0 0',
		padding: '0.8vh 0.5vw 0.8vh 0.5vw',
		borderRadius: '1.5vh',
		border: '0.3vh solid black',
		width: '35vw',
		fontSize: '2.7vh'
	},
	inputAreaStyle: {
		margin: '0 0 0 0',
		padding: '0.8vh 0.5vw 0.8vh 0.5vw',
		borderRadius: '1.5vh',
		border: '0.3vh solid black',
		width: '35vw',
		resize: 'none',
		height: '30vh',
		fontSize: '2.7vh'
	},
	btnStyle: {
		margin: '0 0 0 0',
		padding: '0.6vh 0.4vw 0.6vh 0.4vw',
		border: '0.5vh double white',
		borderRadius: '1.5vh',
		cursor: 'pointer',
		color: 'white',
		backgroundColor: 'black'
	},
	btnCategory: {
		margin: '0 1vw 0 1vw',
		padding: '1vh 0.8vw 1vh 0.8vw',
		borderRadius: '50%',
		border: '0.4vh double red',
		cursor: 'pointer',
		color: 'red',
		backgroundColor: '#1F1F1F',
		fontSize: '2.5vh',
		transition: '0.3s'
	},
	btnCategory1: {
		margin: '0 1vw 0 1vw',
		padding: '1vh 0.8vw 1vh 0.8vw',
		borderRadius: '50%',
		border: '0.4vh double #1BE136',
		cursor: 'pointer',
		color: '#1BE136',
		fontSize: '2.5vh',
		backgroundColor: '#1F1F1F',
		transition: '0.3s'
	},
	imgStyle: {
		height: '5vh',
		margin: '0 1vw 0 0',
		cursor: 'pointer',
		transition: '0.3s'
	},
	imgStyle1: {
		height: '6vh',
		margin: '0 1vw 0 0',
		cursor: 'pointer',
		transition: '0.3s'
	},
	warningTextStyle: {
		margin: '0 0 0 0',
		padding: '0 0 0 1vw',
		fontSize: '3.5vh',
		color: 'black'
	},
	warningFrameStyle: {
		display: 'flex',
		margin: '1.5vh 0 0 0',
		alignItems: 'center',
		width: '25vw',
		height: '8vh',
		justifyContent: 'space-between',
		backgroundColor: '#FD4D4Daa',
		border: '0.8vh double black',
		borderRadius: '2vh'
	}
}