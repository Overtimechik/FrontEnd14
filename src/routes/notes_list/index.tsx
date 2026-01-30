import { createFileRoute } from '@tanstack/react-router'
import { NotesList } from '../../pages/notes/NoteList'

export const Route = createFileRoute('/notes_list/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotesList/>
}
