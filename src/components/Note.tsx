import type { FC } from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNotes } from "../Contexts/NotesContext";
import { Button } from "../share/Button";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  id: string;
  title: string;
  description: string;
  time: string;
}

export const Note: FC<Props> = ({ id, title, description, time }) => {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteNote(id);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full max-w-xl min-w-xs bg-black h-full border border-gray-400 rounded-xl p-4">
        <div className="min-w-0 mb-4">
          <h1 className="text-2xl font-bold text-white mb-2 truncate">
            {title}
          </h1>
          <p className="text-gray-300 line-clamp-2 text-sm">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-end gap-2">
          <p className="text-white text-xs whitespace-nowrap">{time}</p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); navigate({ to: "/notes_list/$notesId/edit", params: { notesId: id } }); }}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Ред.
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Удал.
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить заметку?
        </DialogTitle>
        <DialogContent>
          <p id="alert-dialog-description">
            Вы уверены, что хотите удалить заметку "{title}"? Это действие невозможно отменить.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>
            Отмена
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            style={{ backgroundColor: "#d32f2f" }}
            autoFocus
          >
            {isDeleting ? "Удаляю..." : "Удалить"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
