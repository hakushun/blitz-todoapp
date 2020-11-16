import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import deleteTodo from "app/todos/mutations/deleteTodo"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export const Todo = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const todoId = useParam("todoId", "number")
  const [todo] = useQuery(getTodo, { where: { id: todoId, userId: currentUser?.id } })
  const [deleteTodoMutation] = useMutation(deleteTodo)

  return (
    <div>
      <h1>Todo {todo.id}</h1>
      <pre>{JSON.stringify(todo, null, 2)}</pre>

      <Link href={`/todos/${todo.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTodoMutation({ where: { id: todo.id } })
            router.push("/todos")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowTodoPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/todos">
          <a>Todos</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Todo />
      </Suspense>
    </div>
  )
}

ShowTodoPage.getLayout = (page) => <Layout title={"Todo"}>{page}</Layout>

export default ShowTodoPage
