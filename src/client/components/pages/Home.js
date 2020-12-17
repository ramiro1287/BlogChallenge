import React, {useState, useEffect} from 'react'
import {apiAddress} from '../../ipConfig'

export default function Home() {
	const [posts, setPosts] = useState(null)
	const [selectedPost, setSelectedPost] = useState(null)
	const [toggleSwitch, setToggleSwitch] = useState(0)
	const [warning, setWarning] = useState(false)
	useEffect(()=>{handleFetch()},[])

	function handleFetch() {
		fetch(apiAddress)
		.then(res => res.json())
		.then(data => setPosts(data))
		.catch(err => console.error(err))
	}

	function handleDetail(id) {
		fetch(`${apiAddress}/${id}`)
		.then(res => res.json())
		.then(data => {
			if (data.body.status==='Error') {
				alert('User not Found')
			}
			else{
				setSelectedPost(data.body.post)
				setToggleSwitch(1)
			}
		})
		.catch(err => console.error(err))
	}

	function handleEdit() {
		if (selectedPost.titulo==='' || selectedPost.contenido==='') {
			setWarning(true)
		}
		else {
			fetch(`${apiAddress}/${selectedPost._id}`,{
				method: 'put',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					_id: selectedPost._id,
					titulo: selectedPost.titulo,
					contenido: selectedPost.contenido,
					categoria: selectedPost.categoria
				})
			})
			.then(res => res.json())
			.then(data => {
				alert(data.body.status)
				handleFetch()
				setSelectedPost(null)
				setToggleSwitch(0)
			})
			.catch(err => console.error(err))
		}

	}

	function handleDelete(id) {
		fetch(`${apiAddress}/${id}`,{
			method: 'delete',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			alert(data.body.status)
			handleFetch()
		})
		.catch(err => console.error(err))
	}

	return(
		<div style={styles.container}>
			<div style={styles.frameContainer}>
				{posts ?
					posts.map(p =>{
						return(
						<div key={p._id} style={styles.frame}>
							<p style={styles.titleStyle}>Title: {p.titulo}</p>
							<div style={{display: 'flex', alignItems: 'center'}}>
								<button onClick={()=>handleDetail(p._id)} style={styles.btnStyle}>Detail</button>
								<button onClick={()=>{setSelectedPost(p); setToggleSwitch(2)}} style={styles.btnStyle}>Edit</button>
								<button onClick={()=>handleDelete(p._id)} style={styles.btnStyle}>Delete</button>
							</div>
						</div>
						)
					})
				: <p style={{margin: '0 0 0 0', padding: '0 0 0 0', textAlign: 'center', fontSize: '6vh'}}>Loading...</p>
				}
			</div>
			{toggleSwitch===1 && selectedPost ?
				<div style={styles.frameContainer1}>
					<p>ID: {selectedPost._id}</p>
					<p>Category: {selectedPost.categoria}</p>
					<p>Title: {selectedPost.titulo}</p>
					<p>Content: {selectedPost.contenido}</p>
					<button onClick={()=>{setSelectedPost(null); setToggleSwitch(0)}}>Close</button>
				</div>
			: toggleSwitch===2 && selectedPost ?
				<div style={styles.frameContainer1}>
					<p>Title</p>
					<input
						type='text'
						value={selectedPost.titulo}
						onChange={e => setSelectedPost({...selectedPost, titulo: e.target.value})}
						style={{width: '40vw'}}
					/>
					<p>Content</p>
					<textarea
						type='text'
						value={selectedPost.contenido}
						onChange={e => setSelectedPost({...selectedPost, contenido: e.target.value})}
						style={{width: '40vw', height: '30vh', resize: 'none'}}
					/>
					<p>Category</p>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
						<button onClick={()=>setSelectedPost({...selectedPost, categoria: 'X'})} style={selectedPost.categoria==='X' ? styles.btnCategory1 : styles.btnCategory}>X</button>
						<button onClick={()=>setSelectedPost({...selectedPost, categoria: 'Y'})} style={selectedPost.categoria==='Y' ? styles.btnCategory1 : styles.btnCategory}>Y</button>
						<button onClick={()=>setSelectedPost({...selectedPost, categoria: 'Z'})} style={selectedPost.categoria==='Z' ? styles.btnCategory1 : styles.btnCategory}>Z</button>
					</div>
					{warning ?
						<div style={{margin: '2vh 0 0 0'}}>
							<p style={{color: 'red'}}>Invalid Inputs...</p>
							<button onClick={()=>setWarning(false)}>Ok!</button>
						</div>
					:
					<div style={{margin: '2vh 0 0 0'}}>
						<button onClick={()=>handleEdit()}>Update</button>
						<button onClick={()=>{setSelectedPost(null); setToggleSwitch(0)}}>Close</button>
					</div>
					}
				</div>
			: null
			}
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		width: '100%'
	},
	frameContainer: {
		display: 'row',
		margin: '5vh 0 0 3vw',
		width: '40vw',
		height: '75vh',
		border: '0.7vh solid #262626',
		backgroundColor: '#C1C1C1aa',
		borderRadius: '2vh',
		overflow: 'auto'
	},
	frame: {
		display: 'flex',
		flexDirection: 'row',
		margin: '1vh 0.5vw 2vh 0.5vw',
		borderBottom: '0.5vh dotted black',
		justifyContent: 'space-between'
	},
	titleStyle: {
		margin: '0 0 0 0',
		padding: '1vh 0 2vh 0',
		fontSize: '2.8vh' 
	},
	btnStyle: {
		margin: '0 0.3vw 0 0.3vw',
		padding: '0.8vh 0.4vw 0.8vh 0.4vw',
		border: '0.6vh double white',
		borderRadius: '1.5vh',
		backgroundColor: 'black',
		color: 'white',
		cursor: 'pointer',
		fontSize: '2vh'
	},
	frameContainer1: {
		display: 'row',
		margin: '5vh 0 0 3vw',
		width: '40vw'
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