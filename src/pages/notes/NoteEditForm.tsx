import type { FC } from "react";
import { useEffect, useState } from "react";
import { Button } from "../../share/Button";
import { TextField, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useNotes } from "../../Contexts/NotesContext";
import { apiService } from "../../service/apiService";
import type { INote } from "../../service/apiService";

type FormValues = {
    title: string;
    text: string;
};

export const NoteEditForm: FC = function NoteEditForm() {
    const { notesId } = useParams({ from: "/notes_list/$notesId/edit" });
    const navigate = useNavigate();
    const { updateNote } = useNotes();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [note, setNote] = useState<INote | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    useEffect(() => {
        const loadNote = async () => {
            try {
                const response = await apiService.getNoteById(notesId);
                if (response.status === 200) {
                    setNote(response.data);
                    reset({
                        title: response.data.title,
                        text: response.data.description,
                    });
                }
            } catch (error) {
                console.error("Ошибка при загрузке заметки:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadNote();
    }, [notesId, reset]);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            await updateNote(notesId, {
                title: data.title,
                description: data.text,
            });
            navigate({ to: "/notes_list", search: { created: false } });
        } catch (error) {
            console.error("Ошибка при обновлении заметки:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10">
                <CircularProgress />
            </div>
        );
    }

    if (!note) {
        return <div className="text-center p-6">Заметка не найдена</div>;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-auto gap-4 justify-center p-5 w-full max-w-md border border-black rounded-xl mt-4"
        >
            <h1 className="text-xl font-bold">Редактирование заметки</h1>

            <TextField
                id="edit-title"
                label="Название"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register("title", { required: "Введите название" })}
                fullWidth
            />

            <TextField
                id="edit-text"
                label="Текст заметки"
                variant="outlined"
                multiline
                rows={6}
                error={!!errors.text}
                helperText={errors.text?.message}
                {...register("text", { required: "Введите текст заметки" })}
            />

            <div className="flex gap-3">
                <Button
                    type="button"
                    onClick={() => navigate({ to: "/notes_list", search: { created: false } })}
                    style={{ backgroundColor: "#555" }}
                >
                    Отмена
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Сохраняю..." : "Сохранить изменения"}
                </Button>
            </div>
        </form>
    );
};
