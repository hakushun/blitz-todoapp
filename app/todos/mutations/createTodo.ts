import { Ctx } from "blitz"
import db, { TodoCreateArgs } from "db"

type CreateTodoInput = Pick<TodoCreateArgs, "data">
export default async function createTodo({ data }: CreateTodoInput, ctx: Ctx) {
  ctx.session.authorize()

  // sessionからuserIdの取得
  const id = ctx.session.userId

  // todoにuserIdを紐付ける
  data.user = { connect: { id } }

  const todo = await db.todo.create({ data })

  return todo
}
