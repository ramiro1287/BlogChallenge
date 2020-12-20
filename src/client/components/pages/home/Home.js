import React, {useState, useEffect} from 'react'
import {apiAddress} from '../../../ipConfig'
import Detail from './Detail'
import Edit from './Edit'

export default function Home() {
	const [posts, setPosts] = useState(null)
	const [selectedPost, setSelectedPost] = useState(null)
	const [toggleSwitch, setToggleSwitch] = useState(0)
	const [btnState, setBtnState] = useState('')
	useEffect(()=>{handleFetch()},[])

	function handleFetch() {
		fetch(apiAddress)
		.then(res => res.json())
		.then(data => {
			if (data.body.status==='Error') {
				alert('Error')
			}
			else {
				setPosts(data.body.posts)
			}
		})
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
			setSelectedPost(null)
			setToggleSwitch(0)
			handleFetch()
		})
		.catch(err => console.error(err))
	}

	return(
		<div style={styles.container}>
			<div style={styles.frameContainer}>
				{posts ?
					posts.map(p => {
						return(
						<div key={p._id} style={styles.frame}>
							<div style={{display: 'flex', alignItems: 'center'}}>
								<p style={styles.titleStyle}>Title:</p>
								<p style={styles.titleStyle1}>{p.titulo}</p>
							</div>
							<div style={styles.btnContainer}>
								<img
									onMouseOver={()=>setBtnState('details')}
									onMouseOut={()=>setBtnState('')}
									onClick={()=>handleDetail(p._id)}
									title='Details'
									src='/icons/Detail-Icon.png'
									style={btnState==='details' ? styles.imgStyle1 : styles.imgStyle}
								/>
								<img
									onMouseOver={()=>setBtnState('edit')}
									onMouseOut={()=>setBtnState('')}
									onClick={()=>{setSelectedPost(p); setToggleSwitch(2)}}
									title='Edit'
									src='/icons/Edit-Icon.png'
									style={btnState==='edit' ? styles.imgStyle1 : styles.imgStyle}
								/>
								<img
									onMouseOver={()=>setBtnState('delete')}
									onMouseOut={()=>setBtnState('')}
									onClick={()=>handleDelete(p._id)}
									title='Delete'
									src='/icons/Delete-Icon.png'
									style={btnState==='delete' ? styles.imgStyle1 : styles.imgStyle}
								/>
							</div>
						</div>
						)
					})
				: <p style={{margin: '0 0 0 0', padding: '0 0 0 0', textAlign: 'center', fontSize: '6vh'}}>Loading...</p>
				}
			</div>
			{toggleSwitch===1 && selectedPost ?
				<Detail
					selectedPost={selectedPost}
					setSelectedPost={setSelectedPost}
					setToggleSwitch={setToggleSwitch}
				/>
			: toggleSwitch===2 && selectedPost ?
				<Edit
					selectedPost={selectedPost}
					setSelectedPost={setSelectedPost}
					setToggleSwitch={setToggleSwitch}
					handleFetch={handleFetch}
				/>
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
		borderBottom: '0.5vh dotted #515151',
		justifyContent: 'space-between'
	},
	titleStyle: {
		margin: '0 0.8vw 0 0',
		padding: '1vh 0 2vh 0',
		fontSize: '2.9vh',
		textDecoration: 'underline wavy'
	},
	titleStyle1: {
		margin: '0 0 0 0',
		padding: '1vh 0 2vh 0',
		fontSize: '2.6vh'
	},
	imgStyle: {
		height: '4.5vh',
		margin: '0 0 0 0',
		cursor: 'pointer',
		transition: '0.2s'
	},
	imgStyle1: {
		height: '5.5vh',
		margin: '0 0 0 0',
		cursor: 'pointer',
		transition: '0.2s'
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: '0 0.5vh 0 0',
		width: '8vw'
	}
}