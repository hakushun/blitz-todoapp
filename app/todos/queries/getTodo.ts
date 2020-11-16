import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstTodoArgs } from "db"

type GetTodoInput = Pick<FindFirstTodoArgs, "where">

export default async function getTodo({ where }: GetTodoInput, ctx: Ctx) {
  ctx.session.authorize()

  const todo = await db.todo.findFirst({ where })

  if (!todo) throw new NotFoundError()

  return todo
}
