import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { $axios } from '../../api';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button/Button';

const Home = () => {
    const {name} = useAuth()
    const [gamesInfo, setGamesInfo] = useState([]);
    const [games, setGames] = useState([

    ]);
    const [filter, setFilter] = useState('title')
    const [desc, setDesc] = useState('asc')


    useEffect(() => {
        document.title = 'Discover Games'

        getGames()
    }, [])

    useEffect(() => {
        getGames()
    }, [filter, desc])

    const getGames = () => {
        $axios.get('/games', {
            params: {
                sortBy: filter,
                sortDir:  desc
            }
        })
            .then((res) => {
                console.log(res.data)
                setGamesInfo(res.data)
                setGames(res.data.content)
            })
            .catch(err => console.error(err))
    }

  return (
    <div className='page'>
        <div className={styles.page__filters}>
            {gamesInfo? (
                <>
                    <span> {gamesInfo.totalElements} Games Available</span>
                    <div className="">
                        <div className="sort__game" >
                            <label >title</label>
                            <input 
                                type="checkbox" 
                                onChange={( ) => setFilter('title')}   />
                        </div>
                        <div className="sort__game" >
                            <label >title</label>
                            <input 
                                type="checkbox" 
                                onChange={( ) => setFilter('title')}   />
                        </div>
                        <div className="sort__game" >
                            <label >title</label>
                            <input 
                                type="checkbox" 
                                onChange={( ) => setFilter('title')}   />
                        </div>
                    </div>
                </>
            ): (<></>)}
        </div>
        {games ? (
            <div className={styles.page__content}>
                {games.map((game, index) => 
                    <div className={styles.game} key={index}>
                        <div className={styles.game__header}>
                            <div className={styles.game__header__right}>
                                <a href={`/games/${game.slug}`}>{game.title}</a> 
                                 by <a href={`/users/${game.author}`}>${game.author}</a>
                            </div>
                            <div className={styles.game__header__left}>
                                # scores submitted: {game.scoreCount}
                            </div>
                        </div>
                        <div className={styles.game__header__body}>
                            <img src={game.thumbnail} alt={game.title} />
                            <p>{game.description}</p>
                        </div>
                        {name == game.author ? (
                           <div className="buttons">
                             <a className='btn'  href={`/games/${game.slug}/more`} >Update Game</a>
                           </div>
                        ) : (<></>)}
                    </div>
                )}
            </div>
        ) :(<>loading...</>)}
    </div>
  )
}

export default Home
