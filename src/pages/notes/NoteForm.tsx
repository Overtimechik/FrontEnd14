import type { FC } from "react";
import { Button } from "../../share/Button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useNotes } from "../../Contexts/NotesContext";
import { useState } from "react";

//// ТИПИЗАЦИЯ
interface Props { }

export interface NoteData {
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
export const NoteForm: FC<Props> = function NoteForm() {
    const navigate = useNavigate()
    const { addNote } = useNotes()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        try {
            const newNote = {
                title: data.title,
                description: data.text,
                time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
            }
            await addNote(newNote)
            reset()
            navigate({ to: "/notes_list", search: { created: true } })
        } catch (error) {
            console.error("Ошибка при создании заметки:", error)
        } finally {
            setIsSubmitting(false)
        }
    };

    ///СТРУКТУРА ФОРМЫ
    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto gap-4 justify-center p-5 w-full max-w-md border border-black rounded-xl mt-4">

            <h1 className="text-xl font-bold">Создание заметки</h1>

            <TextField id="outlined-basic" label="Название" variant="outlined"
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register("title", { required: "Введите название" })}
                fullWidth />

            <TextField id="standard-basic" label="Текст заметки" variant="outlined" multiline rows={6}
                error={!!errors.text}
                helperText={errors.text?.message}
                {...register("text", { required: "Введите текст заметки" })}
            />

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Добавляю..." : "Добавить заметку"}
            </Button>
        </form>

    </>
}