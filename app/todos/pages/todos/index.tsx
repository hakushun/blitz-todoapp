import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getTodos from "app/todos/queries/getTodos"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const TodosList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ todos, hasMore }] = usePaginatedQuery(getTodos, {
    where: { user: currentUser },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>
              <a>{todo.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TodosPage: BlitzPage = () => {
  return (
    <div>
            <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
      <p>
        <Link href="/todos/new">
          <a>Create Todo</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TodosList />
      </Suspense>
    </div>
  )
}

TodosPage.getLayout = (page) => <Layout title={"Todos"}>{page}</Layout>

export default TodosPage
