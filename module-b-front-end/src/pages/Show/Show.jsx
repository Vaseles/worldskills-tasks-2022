import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { $axios } from '../../api';
import styles from './Show.module.css'

const Show = () => {
  const {slug} = useParams()
  // set data
  const [game, setGame] = useState([]);
  const [scores, setScores] = useState([])

  useEffect(() => {
    document.title = ''

    getScores()
    getGame()
  }, [])

   const getGame = () => {
    $axios.get(`/games/${slug}`)
        .then((res) => {
          console.log(res)
          setGame(res.data)
        })
   }
   const getScores= () => {
    $axios.get(`/games/${slug}/scores`)
        .then((res) => {
          console.log(res)
          setScores(res.data.scores)
        })
   }

  return (
    <div className='page'>
      <div className={styles.game}></div>
      <div className="buttons">
        <div className={styles.right}>
          <h3>Top 10  Leaderboard</h3>
          {scores ? (
            <div>
              {scores ? (
            <div className={styles.scores}>
                {scores.map((score, index) => 
                    <div className={styles.score} key={styles.score}>
                        <h3># {index}  {score.username}</h3>
                        <span>{score.score}</span>
                    </div>    
                )}
            </div>
        ) : (<p>Loading...</p>)}
            </div>
          ): (<div>Not found....</div>)}
        </div>
        <div className={styles.left}>
          <h3>Description</h3>
          {game? (
            <div>{game.description}</div>
          ): (<div>Loading....</div>)}
        </div>
      </div>
    </div>
  )
}

export default Show
