import React from "react"

type TodoFormProps = {
  initialValues: string
  onSubmit: (title: string) => void
}

const TodoForm = ({ initialValues, onSubmit }: TodoFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  )
}

export default TodoForm
