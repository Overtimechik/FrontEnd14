import type { FC } from "react";
import { useParams } from "@tanstack/react-router";
import { useNotes } from "../../Contexts/NotesContext";
import { Button } from "../../share/Button";
import { useEffect, useState } from "react";
import { apiService } from "../../service/apiService";
import type { INote } from "../../service/apiService";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

interface Props { }

export const NoteOne: FC<Props> = function NoteOne() {
    const { notesId } = useParams({ from: "/notes_list/$notesId" })
    const { deleteNote } = useNotes()
    const [note, setNote] = useState<INote | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const loadNote = async () => {
            try {
                const response = await apiService.getNoteById(notesId)
                if (response.status === 200) {
                    setNote(response.data)
                }
            } catch (error) {
                console.error("Ошибка при загрузке заметки:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadNote()
    }, [notesId])

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true)
    }

    const handleDeleteConfirm = async () => {
        if (!note) return
        setIsDeleting(true)
        try {
            await deleteNote(note.id)
            setOpenDeleteDialog(false)
            
        } catch (error) {
            console.error("Ошибка при удалении заметки:", error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false)
    }

    if (isLoading) {
        return <div className="text-center">Загрузка...</div>
    }

    if (!note) {
        return <div className="text-center">Заметка не найдена</div>
    }

    return <>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-6">
            <div className="bg-black text-white rounded-xl p-6 border border-gray-400">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{note.title}</h1>
                        <p className="text-gray-400">{note.time}</p>
                    </div>
                </div>
                <p className="text-white mb-6 whitespace-pre-wrap">{note.description}</p>
                
                <div className="flex gap-4">
                    <Button 
                        onClick={handleDeleteClick}
                        style={{ backgroundColor: '#d32f2f' }}
                    >
                        Удалить
                    </Button>

                </div>
            </div>
        </div>

        <Dialog 
            open={openDeleteDialog} 
            onClose={handleDeleteCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Удалить заметку?
            </DialogTitle>
            <DialogContent>
                <p id="alert-dialog-description">
                    Вы уверены, что хотите удалить заметку "{note.title}"? Это действие невозможно отменить.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteCancel}>
                    Отмена
                </Button>
                <Button 
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    style={{ backgroundColor: '#d32f2f' }}
                    autoFocus
                >
                    {isDeleting ? "Удаляю..." : "Удалить"}
                </Button>
            </DialogActions>
        </Dialog>
    </>
}
