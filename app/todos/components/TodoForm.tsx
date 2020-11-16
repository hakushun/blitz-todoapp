import React from "react"
import { Field, Form, FormProps } from "react-final-form"

type TodoFormProps = {
  initialValues: FormProps["initialValues"]
  onSubmit: (value: { title: string }) => Promise<void>
}

const TodoForm = ({ initialValues, onSubmit }: TodoFormProps) => {

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <div>Put your form fields here. But for now, just click submit</div>
          <div>
            <Field name="title" type="text">
              {({input}) => (
                <input {...input} />
              )}
            </Field>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>

  )
}

export default TodoForm
