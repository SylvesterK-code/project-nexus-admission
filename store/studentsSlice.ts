// store/studentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Student } from '../components/StudentCard'

type StudentsState = {
  list: Student[]
  inProgress?: Student
}

const initialState: StudentsState = {
  list: [],
  inProgress: undefined,
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action: PayloadAction<Student[]>) {
      state.list = action.payload
    },
    addStudent(state, action: PayloadAction<Student>) {
      state.list.unshift(action.payload)
    },
    setInProgress(state, action: PayloadAction<Student>) {
      state.inProgress = action.payload
    },
    clearInProgress(state) {
      state.inProgress = undefined
    },
  },
})

// ✅ Export the actions
export const { setStudents, addStudent, setInProgress, clearInProgress } =
  studentsSlice.actions

export default studentsSlice.reducer
