import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch all courses
export const fetchCourses = createAsyncThunk('course/fetchCourses', async () => {
  const res = await axios.get('http://localhost:8000/api/course/published-courses')
  return res.data.courses
})

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    course: [],             // array of all courses
    enrolledCourses: [],    // array of enrolled courses
    status: 'idle',
    error: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.course = action.payload
    },
    updateCourse: (state, action) => {
      const updatedCourse = action.payload
      const index = state.course.findIndex(c => c._id === updatedCourse._id)
      if (index !== -1) {
        state.course[index] = updatedCourse
      }
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.course = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setCourses, updateCourse, setEnrolledCourses } = courseSlice.actions
export default courseSlice.reducer
