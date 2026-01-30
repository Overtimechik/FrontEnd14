import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes_list/$notesId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/notes_list/$notesId"!</div>
}
