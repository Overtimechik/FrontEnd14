import type { FC } from "react";
import { Button } from "../../share/Button";
import { Note } from "../../components/Note";
import { useNavigate } from "@tanstack/react-router";
import { useNotes } from "../../Contexts/NotesContext";





export const NotesList: FC = function NoteList(){
    const navigate = useNavigate()
    const {notes} = useNotes();//выводит весь контекст в сетку с заметками
    return <div className="flex flex-col gap-6 items-center justify-center p-6">
        <Button onClick={()=>navigate({to:"/notes_list/add"})}>{"+"}</Button>
        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-2">
            {notes.map((note)=>(
                <li key={note.id}>
                    <Note
                        title={note.title}
                        description={note.description}
                        time={note.time}
                        />
                </li>
            ))}
            
        </ul>
    </div>
}