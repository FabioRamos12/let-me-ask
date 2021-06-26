import { Link } from "react-router-dom"

import './styles.scss'

type MyRoomProps = {
    roomId: string;
    roomTitle: string;
    questionLength: number;
}

export function MyRoom({
    roomId,
    roomTitle,
    questionLength
}: MyRoomProps) {
    return (
        <>
            {roomTitle &&
                <Link className="room-card" to={`/rooms/${roomId}`}>
                    <header>
                        <h2>{roomTitle}</h2>
                    </header>
                    <p>{questionLength} pergunta(s)</p>
                    <div>
                        <span>status:</span>
                        <span>Em andamento</span>
                    </div>
                </Link>
            }
        </>
    )
}