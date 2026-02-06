import type { FC } from "react";
import { Button } from "../../share/Button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

//// ТИПИЗАЦИЯ
interface Props{

}

interface NoteData {
  id: string;
  title: string;
  description: string;
  time: string;
}

type FormValues = {
    title: string;
    text: string;
};

///ДАТА
export const notes: NoteData[] = [
  {
    id: "1",
    title: "Сходить в магазин и купить продукты",
    description: "Молоко, хлеб, яйца, сыр, овощи",
    time: "09:30",
  },
  {
    id: "2",
    title: "Подготовка к экзамену",
    description:
      "Повторить темы по React, TypeScript и Tailwind CSS",
    time: "14:10",
  },
  {
    id: "3",  
    title: "Идея для проекта",
    description:
      "Сделать приложение заметок с авторизацией и базой данных",
    time: "18:00",
  },
];


///ЛОГИКА ФОРМЫ
export const NoteForm: FC<Props> = function NoteForm(){
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();


    const onSubmit = (data: FormValues) => {
        const note:NoteData={
          id:crypto.randomUUID(),
          title:data.title,
          description:data.text,
          time:new Date().toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit", })
        }
        notes.push(note)
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