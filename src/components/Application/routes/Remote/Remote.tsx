import * as React from 'react'

import TodoList from '@yana4961/react-todo-list'
import '@yana4961/react-todo-list/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'

export function Remote() {
  const [error, setError] = React.useState(undefined)
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.remoteTodos || undefined)

  React.useEffect(() => {
    if (!todos)
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((resposne) => resposne.json())
        .then((result: TodoResponse[]) => {
          dispatch({
            type: 'SET-REMOTE-TODOS',
            payload: result.map((i) => ({
              done: i.completed,
              label: i.title,
              important: false,
              id: i.id,
            })),
          })
        })
        .catch((e) => {
          setError(e)
        })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (!todos) {
    return <div>Loading todos from a local server</div>
  }

  return <TodoList todoData={todos} />
}

interface TodoResponse {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface Todo {
  label: string
  id: number
  done: boolean
  important: boolean
}
