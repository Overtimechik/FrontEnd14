import { createFileRoute } from '@tanstack/react-router'
import { NoteForm } from '../../pages/notes/NoteForm'

export const Route = createFileRoute('/notes_list/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NoteForm/>
}
