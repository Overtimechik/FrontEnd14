import type { FC } from "react";
import { Button } from "../../share/Button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useNotes } from "../../Contexts/NotesContext";

//// ТИПИЗАЦИЯ
interface Props{

}

export  interface NoteData {
  id: string;
  title: string;
  description: string;
  time: string;
}

type FormValues = {
    title: string;
    text: string;
};


///ЛОГИКА ФОРМЫ
export const NoteForm: FC<Props> = function NoteForm(){
    const navigate = useNavigate()
    const {addNote} = useNotes()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();


    const onSubmit = (data: FormValues) => {
        const newNote:NoteData={
          id:crypto.randomUUID(),
          title:data.title,
          description:data.text,
          time:new Date().toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit", })
        }
        addNote(newNote);//Добавление заметки в контекст для обновления и записи
        console.log(data); 
        reset();
        navigate({ to: "/notes_list" });
    };



    ///СТРУКТУРА ФОРМЫ
    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto gap-4 justify-center p-5 w-full max-w-md border border-black rounded-xl mt-4">
        
        <h1 className="text-xl font-bold">Создание заметки</h1>

        <TextField id="outlined-basic" label="Название" variant="outlined" 
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register("title", { required: "Введите название" })}
                fullWidth />

        <TextField id="standard-basic" label="Текст заметки" variant="outlined" multiline  rows={6}
                error={!!errors.text}
                helperText={errors.text?.message}
                {...register("text",{required:"Введите текст заметки"})}
        />

        <Button type="submit">Добавить заметку</Button>
    </form>
}