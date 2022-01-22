import React, { FormEvent, useState } from "react"

import { connect, RootStateOrAny } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { DefaultActionCreators } from "reduxsauce"
import { Creators as TodoActions, TodoProps } from "./store/ducks/todos"

import "./styles.css"

interface Props {
  todos: TodoProps[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

export const TodoList: React.FC<Partial<Props>> = ({
  todos = [],
  addTodo = () => console.log(null),
  toggleTodo = () => console.log(null),
  removeTodo = () => console.log(null)
}) => {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    addTodo(inputValue)

    setInputValue('')
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit">Novo</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.complete ? <s>{todo.text}</s> : todo.text}
            <div>
              <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

const mapStateToProps: (state: RootStateOrAny) => { todos: TodoProps[] } = state => ({
  todos: state.todos as TodoProps[]
})

const mapDispatchToProps: (dispatch: Dispatch) => DefaultActionCreators = dispatch =>
  bindActionCreators(TodoActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)