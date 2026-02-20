import { createFileRoute } from '@tanstack/react-router'
import { NotesList } from '../../pages/notes/NoteList'

export const Route = createFileRoute('/notes_list/')({
  validateSearch: (search: Record<string, unknown>) => ({
    created: search.created === true,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <NotesList />
}
