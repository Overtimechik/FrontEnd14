import type { FC } from "react";
import { Button } from "../../share/Button";
import { Note } from "../../components/Note";

interface NoteData {
  id: number;
  title: string;
  description: string;
  time: string;
}

const notes: NoteData[] = [
  {
    id: 1,
    title: "Сходить в магазин и купить продукты",
    description: "Молоко, хлеб, яйца, сыр, овощи",
    time: "09:30",
  },
  {
    id: 2,
    title: "Подготовка к экзамену",
    description:
      "Повторить темы по React, TypeScript и Tailwind CSS",
    time: "14:10",
  },
  {
    id: 3,
    title: "Идея для проекта",
    description:
      "Сделать приложение заметок с авторизацией и базой данных",
    time: "18:00",
  },
];
export const NotesList: FC = function NoteList(){
    return <div className="flex items-center justify-center p-6">
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
            <Button>{"+"}</Button>
    </div>
}