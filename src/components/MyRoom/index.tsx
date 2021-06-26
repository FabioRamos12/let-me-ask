import { Link } from "react-router-dom"
import { database } from "../../services/firebase"

import deleteImg from '../../assets/images/delete.svg'

import './styles.scss'

type AuthorRoomProps = {
    title: string;
    roomId: string;
    questionLength: number;
    status: {} | boolean
}

export function MyRoom({
    roomId,
    title,
    questionLength,
    status
}: AuthorRoomProps) {
    async function handleDeleteQuestion(roomId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta sala ?')) {
            await database.ref(`rooms/${roomId}`).remove()
        }
        console.log(roomId)
    }

    return (
        <>
            {title &&
                <div className="room-card" >
                    <Link to={`/admin/rooms/${roomId}`}>
                        <header>
                            <h2>{title}</h2>
                        </header>
                        <p>{questionLength} pergunta(s)</p>
                    </Link>

                    <div>
                        {status ? (
                            <span className="closed">Encerrado</span>
                        ) : (
                            <span className="ongoing">Em andamento</span>
                        )}

                        <button
                            type="button"
                            onClick={() => handleDeleteQuestion(roomId)}
                        >
                            <img src={deleteImg} alt="Remover pergunta" />
                        </button>
                    </div>
                </div>
            }
        </>
    )
}