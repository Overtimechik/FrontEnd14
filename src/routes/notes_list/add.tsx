import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes_list/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/notes_list/add"!</div>
}
