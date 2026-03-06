import { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import type { INote } from "../service/apiService";
import { apiService } from "../service/apiService";

interface NoteContextType {
    notes: INote[]
    addNote: (note: Omit<INote, "id" | "createdAt">) => Promise<void>
    updateNote: (id: string, note: Partial<INote>) => Promise<void>
    deleteNote: (id: string) => Promise<void>
    fetchNotes: () => Promise<void>
    isLoading: boolean
    error: string | null
}

const NotesContext = createContext<NoteContextType | null>(null)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<INote[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchNotes = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await apiService.getNotes()
            if (response.status === 200) {
                setNotes(response.data)
            }
        } catch (err) {
            setError("Ошибка при загрузке заметок")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addNote = useCallback(async (note: Omit<INote, "id" | "createdAt">) => {
        try {
            const response = await apiService.createNote(note)
            if (response.status === 201) {
                setNotes((prev) => [...prev, response.data])
            }
        } catch (err) {
            setError("Ошибка при создании заметки")
            console.error(err)
        }
    }, [])

    const updateNote = useCallback(async (id: string, note: Partial<INote>) => {
        try {
            const response = await apiService.updateNote(id, note)
            if (response.status === 200) {
                setNotes((prev) => prev.map((n) => (n.id === id ? response.data : n)))
            }
        } catch (err) {
            setError("Ошибка при обновлении заметки")
            console.error(err)
        }
    }, [])

    const deleteNote = useCallback(async (id: string) => {
        try {
            const response = await apiService.deleteNote(id)
            if (response.status === 200) {
                setNotes((prev) => prev.filter((n) => n.id !== id))
            }
        } catch (err) {
            setError("Ошибка при удалении заметки")
            console.error(err)
        }
    }, [])

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchNotes, isLoading, error }}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes = () => {
    const context = useContext(NotesContext)
    if (!context) {
        throw new Error("418")
    }
    return context
}