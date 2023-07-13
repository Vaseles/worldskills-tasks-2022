import React, { useEffect, useState } from 'react'
import styless from './Game.module.css'
import styles from './../Auth/Auth.module.css'
import { $axios } from '../../api';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

const Game = () => {
  const {slug} = useParams()
  // set data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [game, setGame] = useState([]);

  useEffect(() => {
    document.title = game.title
    getGame()
  }, [])

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
   }

   const changeDescription = (e) => {
    e.preventDefault()
   }

   const deleteGame = (e) => {
    e.preventDefault()
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
            <img src='' alt='' />
            <form action="">
          <textarea  
            type="text"  
            value={title}
            onChange={e => setTitle(e.target.value)}></textarea>
            <Button onClick={changeTitle}>edit</Button>
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
