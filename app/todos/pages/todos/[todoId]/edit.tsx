import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import TodoForm from "app/todos/components/TodoForm"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export const EditTodo = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const todoId = useParam("todoId", "number")
  const [todo, { setQueryData }] = useQuery(getTodo, { where: { id: todoId, userId: currentUser?.id } })
  const [updateTodoMutation] = useMutation(updateTodo)

  return (
    <div>
      <h1>Edit Todo {todo.id}</h1>
      <pre>{JSON.stringify(todo)}</pre>

      <TodoForm
        initialValues={todo.title}
        onSubmit={async (title) => {
          try {
            const updated = await updateTodoMutation({
              where: { id: todo.id },
              data: { title },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/todos/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating todo " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditTodoPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTodo />
      </Suspense>

      <p>
        <Link href="/todos">
          <a>Todos</a>
        </Link>
      </p>
    </div>
  )
}

EditTodoPage.getLayout = (page) => <Layout title={"Edit Todo"}>{page}</Layout>

export default EditTodoPage
