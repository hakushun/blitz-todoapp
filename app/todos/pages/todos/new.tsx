import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createTodo from "app/todos/mutations/createTodo"
import TodoForm from "app/todos/components/TodoForm"

const NewTodoPage: BlitzPage = () => {
  const router = useRouter()
  const [createTodoMutation] = useMutation(createTodo)

  const handleSubmit = async (value: { title: string }) => {
    const { title } = value;
    try {
      const todo = await createTodoMutation({ data: { title } })
      alert("Success!" + JSON.stringify(todo))
      router.push(`/todos/${todo.id}`)
    } catch (error) {
      alert("Error creating todo " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <div>
      <h1>Create New Todo</h1>

      <TodoForm
        initialValues={{title: ""}}
        onSubmit={handleSubmit}
      />

      <p>
        <Link href="/todos">
          <a>Todos</a>
        </Link>
      </p>
    </div>
  )
}

NewTodoPage.getLayout = (page) => <Layout title={"Create New Todo"}>{page}</Layout>

export default NewTodoPage
