import { useState } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'
import logoImg from '../../assets/images/logo.svg'
import { useRooms } from '../../hooks/useRooms'
import { MyRoom } from '../../components/MyRoom'

export function MyRooms() {
    const [darkMode, setDarkMode] = useState(false)
    const { authorRoom } = useRooms()

    function tet() {
        console.log(authorRoom)
    }

    return (
        <div id="page-myrooms" className={`${darkMode ? 'dark-mode' : ''}`}>
            <header>
                <div className="content">
                    <Link to='/'>
                        <img src={logoImg} alt="Logo" />
                    </Link>
                </div>
            </header>

            <main className="content">
                <div className="darkModeButtonContainer">
                    <input className="switch switchShadow" type="checkbox" id="dark-mode" onClick={() => setDarkMode(!darkMode)} />
                    <label htmlFor="dark-mode"></label>
                </div>
                <div className="room-title">
                    <h1>Minhas Salas</h1>
                </div>

                <div className="room-cards">
                    {authorRoom.map((room: any) => {
                        return (
                            <MyRoom
                                key={room.roomId}
                                title={room.title}
                                roomId={room.roomId}
                                questionLength={room.questionLength}
                                status={room.status}
                            />
                        )
                    })}
                </div>

            </main>
        </div>
    )
}