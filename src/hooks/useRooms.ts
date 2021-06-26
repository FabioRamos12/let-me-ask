import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>

type Room = Record<string, {
    authorId: string;
    endedAt?: string;
    questions: Record<string, FirebaseQuestions>
    title: string;
}>

type AuthorRoomProps = {
    title: string | boolean;
    roomId: string;
    questionLength: number;
    status: {} | boolean
}

export function useRooms() {
    const { user } = useAuth()
    const [authorRoom, setAuthorRoom] = useState<AuthorRoomProps[]>([])

    useEffect(() => {
        const roomRef = database.ref(`rooms`)


        roomRef.on('value', room => {
            const databaseRoom: Room = room.val()
            const rooms = Object.entries(databaseRoom) ?? {}

            const parsedRooms = rooms.map(([key, value]) => {
                return {
                    title: value.authorId === user?.id && value.title,
                    roomId: key,
                    questionLength: Object.values(value.questions ?? {}).length,
                    status: value.endedAt ?? false
                }
            })

            setAuthorRoom(parsedRooms)
        })

        return () => {
            roomRef.off('value')
        }
    }, [user?.id])

    return { authorRoom }
}