import { createContext, useContext, useState, type ReactNode } from "react";
import type { NoteData } from "../pages/notes/NoteForm";

interface NoteContextType{ //Создание типизации контекста и того что будет туда поступать
    notes:NoteData[]
    addNote:(note:NoteData)=>void
}

const NotesContext = createContext<NoteContextType | null>(null)//Cоздание контекста с изначально пустым 

export const NotesProvider = ({ children }: { children: ReactNode }) =>{//Настройка провайдера которой пинает реакт перерисовывать объекты
    const [notes, setNotes] = useState<NoteData[]>([])//черрез стэйт
    const addNote = (note:NoteData)=>{
        setNotes((prev)=>[...prev,note])// перересовывает прошлое значение и добавляет новое из формы NoteForm.tsx
    }

    return(//Передает значение value всем компонентам внутри. Написано в __root.tsx
        <NotesContext.Provider value={{notes, addNote}}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes = () =>{//Краткая форма записи useContext(NotesContext) только в виде useNotes() который и возвращает наш контекст 
    const context = useContext(NotesContext)
    if(!context){
        throw new Error("418")
    }
    return context
}