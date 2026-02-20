import { useState, useEffect } from "react";
import type { FC } from "react";
import { Button } from "../../share/Button";
import { Note } from "../../components/Note";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useNotes } from "../../Contexts/NotesContext";
import { Snackbar, Alert } from "@mui/material";

export const NotesList: FC = function NoteList() {
    const navigate = useNavigate()
    const search = useSearch({ strict: false }) as { created?: boolean };
    const { notes } = useNotes();//выводит весь контекст в сетку с заметками
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (search?.created) {
            setOpen(true);
            // Optionally clear the query param so it doesn't show again on reload
            navigate({ to: "/notes_list", replace: true, search: { created: false } });
        }
    }, [search?.created, navigate]);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div className="flex flex-col gap-6 items-center justify-center p-6">
        <Button onClick={() => navigate({ to: "/notes_list/add" })}>{"+"}</Button>
        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-2">
            {notes.map((note) => (
                <li key={note.id}>
                    <Note
                        title={note.title}
                        description={note.description}
                        time={note.time}
                    />
                </li>
            ))}

        </ul>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', opacity: 1, backgroundColor: '#2e7d32', color: '#fff', '& .MuiAlert-icon': { color: '#fff' }, '& .MuiAlert-action .MuiIconButton-root': { color: '#fff' } }}>
                Заметка успешно создана!
            </Alert>
        </Snackbar>
    </div>
}