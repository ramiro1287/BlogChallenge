import React, {useState} from 'react'
import {apiAddress} from '../../ipConfig'

export default function Create(props) {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [warning, setWarning] = useState(null)

	function inputsValidate() {
		if (title==='' || content==='' || category==='') {setWarning('Invalid inputs...')}
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
					{warning ? warning : null}
					{!warning ?
					<button onClick={()=>inputsValidate()} style={styles.btnStyle}>Create Post</button>
					: <button onClick={()=>setWarning(null)} style={styles.btnStyle1}>Ok!</button>
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
		margin: '4vh 0 2vh 0',
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
	btnStyle1: {
		margin: '0 0 0 0',
		padding: '0.6vh 0.4vw 0.6vh 0.4vw',
		border: '0.5vh double white',
		borderRadius: '1.5vh',
		cursor: 'pointer',
		color: 'white',
		backgroundColor: '#FF5F5F'
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
	}
}