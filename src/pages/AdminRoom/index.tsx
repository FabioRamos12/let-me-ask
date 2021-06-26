import { useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import './styles.scss'
import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { database } from '../../services/firebase'
import { useRoom } from '../../hooks/useRoom'

type RoomParams = {
    id: string
}

export function AdminRoom() {
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id
    const [darkMode, setDarkMode] = useState(false)

    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que você deseja encerrar esta sala ?')) {
            database.ref(`rooms/${roomId}`).update({
                endedAt: new Date()
            })
            history.push('/')
        }
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta ?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    return (
        <div id="page-room" className={`${darkMode ? 'dark-mode' : ''} ${questions.length > 0 ? '' : 'no-quesions'}`}>
            <header>
                <div className="content">
                    <Link to='/'>
                        <img src={logoImg} alt="Logo" />
                    </Link>
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}
                        >
                            Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="darkModeButtonContainer">
                    <input className="switch switchShadow" type="checkbox" id="dark-mode" onClick={() => setDarkMode(!darkMode)} />
                    <label htmlFor="dark-mode"></label>
                </div>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}