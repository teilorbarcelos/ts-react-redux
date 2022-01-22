import { createActions, createReducer } from "reduxsauce"

export interface TodoProps {
  id: number
  text: string
  complete: boolean
}

// Creating action types and creators \|/

export const { Types, Creators } = createActions({
  addTodo: ['text'],
  toggleTodo: ['id'],
  removeTodo: ['id']
})

// Creating reducer handlers \|/

const INITIAL_STATE: TodoProps[] = []

const add = (state = INITIAL_STATE, action: { text: string }) => [
  ...state,
  { id: Math.random(), text: action.text, complete: false }
]

const toggle = (state = INITIAL_STATE, action: any) => state.map(
  todo =>
    todo.id === action.id
      ? { ...todo, complete: !todo.complete }
      : todo
)

const remove = (state = INITIAL_STATE, action: any) =>
  state.filter(todo => todo.id !== action.id)

// Creating reducer \|/

export default createReducer(INITIAL_STATE, {
  [Types.ADD_TODO]: add,
  [Types.TOGGLE_TODO]: toggle,
  [Types.REMOVE_TODO]: remove
})