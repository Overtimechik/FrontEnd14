import { createFileRoute } from '@tanstack/react-router'
import { NoteEditForm } from '../../pages/notes/NoteEditForm'

export const Route = createFileRoute('/notes_list/$notesId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NoteEditForm />
}
