import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

export function useRooms() {
    const { user } = useAuth()
    const [authorRooms, setAuthorRooms] = useState<any>([])

    useEffect(() => {
        const roomRef = database.ref(`rooms`)


        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const rooms = Object.entries(databaseRoom)

            const parsedRooms = rooms.map(([key, value]: any) => {
                return {
                    authorRoom: value.authorId === user?.id && value,
                    roomId: key,
                    questionLength: Object.values(value.questions ?? {}).length,
                    status: Object.values(value.endedAt ?? {})
                }
            })

            setAuthorRooms(parsedRooms)
        })

        return () => {
            roomRef.off('value')
        }
    }, [user?.id])

    return { authorRooms }
}