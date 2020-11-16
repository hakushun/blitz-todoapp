import React, { useState } from "react"

type TodoFormProps = {
  initialValues: string
  onSubmit: (title: string) => void
}

const TodoForm = ({ initialValues, onSubmit }: TodoFormProps) => {
  const [title, setTitle] = useState<string>(initialValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(title)
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <div>
        <input type="text" value={title} onChange={handleChange} />
      </div>
      <button>Submit</button>
    </form>
  )
}

export default TodoForm
