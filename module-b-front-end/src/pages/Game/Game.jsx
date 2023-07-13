import React, { useEffect, useState } from 'react'
import styless from './Game.module.css'
import styles from './../Auth/Auth.module.css'
import { $axios } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

const Game = () => {
  const {slug} = useParams()
  const navigate = useNavigate()
  // set data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [game, setGame] = useState([]);

  useEffect(() => {
    document.title = game.title
    getGame()
  }, [])

  useEffect(() => {
    console.log(game.author)
  }, [game])

   const getGame = () => {
    $axios.get(`/games/${slug}`)
        .then((res) => {
          console.log(res.data)
          setGame(res.data)
          setTitle(res.data.title)
          setDescription(res.data.description)
        })
   }

   const changeTitle = (e) => {
    e.preventDefault()
    $axios.put(`/games/${slug}`, {title: title, description: description})
      .then((res) => {
        console.log(res)
      })
   }

   const changeDescription = (e) => {
    e.preventDefault()
    $axios.put(`/games/${slug}`, {title: title, description: description})
    .then((res) => {
      console.log(res)
    })
   }

   const deleteGame = (e) => {
    e.preventDefault()
    $axios.delete(`/games/${slug}`)
      .then((res) => {
        navigate('/')
      })
   }

  return (
    <div className={styles.auth}>
        <h2 className={styles.auth__title}>
            Manage Game
        </h2>
      <div className={styles.auth__block}>
          <form action="">
          <input  
            type="text"  
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
            <Button onClick={changeTitle}>edit</Button>
          </form>
          <div className="buttons">
            <img src='' alt='' className='img' />
            <form action="">
          <textarea  
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
            <Button onClick={changeDescription}>edit</Button>
          </form>
          </div>
      </div>
      <div className="buttons">
        <Button>Upload New Version</Button>
        <Button onClick={deleteGame}>Delete</Button>
      </div>
    </div>
  )
}

export default Game
