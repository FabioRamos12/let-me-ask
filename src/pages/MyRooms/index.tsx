import { useState } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'
import logoImg from '../../assets/images/logo.svg'
import { useRooms } from '../../hooks/useRooms'
import { MyRoom } from '../../components/MyRoom'

export function MyRooms() {
    /*  const { user } = useAuth()
     const params = useParams<RoomParams>();
     const [newQuestion, setNewQuestion] = useState('') */
    const [darkMode, setDarkMode] = useState(false)
    const { authorRooms } = useRooms()

    function print() {
        console.log(authorRooms)
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

                <button onClick={print}>console</button>

                <div className="room-cards">
                    {authorRooms.map((room: any, key: number) => {
                        return (
                            <MyRoom
                                key={key}
                                roomTitle={room.authorRoom.title}
                                roomId={room.roomId}
                                questionLength={room.questionLength}
                            />
                        )
                    })}
                </div>

            </main>
        </div>
    )
}