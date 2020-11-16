import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import TodoForm from "app/todos/components/TodoForm"

export const EditTodo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [todo, { setQueryData }] = useQuery(getTodo, { where: { id: todoId } })
  const [updateTodoMutation] = useMutation(updateTodo)

  return (
    <div>
      <h1>Edit Todo {todo.id}</h1>
      <pre>{JSON.stringify(todo)}</pre>

      <TodoForm
        initialValues={todo}
        onSubmit={async () => {
          try {
            const updated = await updateTodoMutation({
              where: { id: todo.id },
              data: { name: "MyNewName" },
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
