import { createFileRoute } from '@tanstack/react-router'
import { NoteOne } from '../../pages/notes/NoteOne'

export const Route = createFileRoute('/notes_list/$notesId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NoteOne />
}
