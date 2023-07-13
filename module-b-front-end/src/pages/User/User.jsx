import React, { useEffect, useState } from 'react'
import styles from './User.module.css'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import { $axios } from '../../api'

const User = () => {
    // for save data
    const [data, setData] =  useState([])
    const [games, setGames] =  useState([])
    const [scores, setScores] =  useState([])

    // get param
    const {name} = useParams()

    // base load after
    useEffect(() => {
        document.title = name

        getUserData()
    }, [])

    // get user data function
    const getUserData =  () => {
         $axios.get(`/users/${name}`)
            .then((response) => {
                console.log(response.data)
                setData(response.data)
                setGames(response.data.authoredGames)
                setScores(response.data.highscores)
            })
    }
  return (
    <div className='page'>
        <h2 className='title' >{name}</h2>
        <h3>Authored games</h3>
        {games ? (
            <div className={styles.games}>
                {games.map((game, index) => 
                    <div className={styles.game} key={index}>
                        <div className={styles.game__header}>
                            <div className={styles.game__header__right}>
                                <a href={`/games/${game.slug}`}>{game.title}</a> 
                            </div>
                            <div className={styles.game__header__left}>
                                # scores submitted: 0
                            </div>
                        </div>
                        <div className={styles.game__header__body}>
                            <img src={game.thumbnail} alt={game.title} />
                            <p>{game.description}</p>
                        </div>
                        {name == data.username ? (
                           <div className="buttons">
                             <a className='btn'  href={`/games/${game.slug}/more`} >Update Game</a>
                           </div>
                        ) : (<></>)}
                    </div>
                )}
            </div>
        ) : (<p>Loading...</p>)}
        <h3>Highscores per Game</h3>
         {scores ? (
            <div className={styles.scores}>
                {scores.map(score => 
                    <div className={styles.score} key={styles.score}>
                        <h3>{score.game.title}</h3>
                        <span>{score.score}</span>
                    </div>    
                )}
            </div>
        ) : (<p>Loading...</p>)}
    </div>
  )
}

export default User
