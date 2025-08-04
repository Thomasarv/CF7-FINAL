import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { setLecture } from '@/redux/lectureSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const LectureTab = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const params = useParams()
  const { courseId, lectureId } = params
  const { lecture } = useSelector(store => store.lecture)
  const selectedLecture = lecture.find(lec => lec._id === lectureId)

  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || '')
  const [lectureDescription, setLectureDescription] = useState(selectedLecture?.description || '')
  const [isFree, setIsFree] = useState(selectedLecture?.isPreviewFree || false)
  const [loading, setLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchLectures = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/course/${courseId}/lecture`, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setLecture(res.data.lectures))
      }
    } catch (error) {
      console.log('Failed to fetch lectures', error)
      toast.error('Failed to fetch lectures')
    }
  }

  useEffect(() => {
    fetchLectures()
  }, [courseId])

  const editLectureHandler = async (e) => {
    e.preventDefault()
    const data = {
      lectureTitle,
      description: lectureDescription,
      isPreviewFree: isFree,
    }
    try {
      setLoading(true)
      const res = await axios.post(
       `${backendURL}/api/course/${courseId}/lecture/${lectureId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        await fetchLectures()
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update lecture')
    } finally {
      setLoading(false)
    }
  }

  const removeLectureHandler = async (e) => {
    e.preventDefault()
    try {
      setRemoveLoading(true)
      const res = await axios.delete(
        `${backendURL}/api/course/lecture/${lectureId}`,
        { withCredentials: true }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        navigate(`/admin/course/${courseId}/lecture`)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete lecture')
    } finally {
      setRemoveLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
            {removeLoading ? (
              <>
                <Loader2 className="mr-1 w-4 h-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Remove Lecture'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Ex. Introduction to JavaScript"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 resize-none"
            placeholder="Write lecture description here..."
            rows={5}
            value={lectureDescription}
            onChange={(e) => setLectureDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch checked={isFree} onCheckedChange={setIsFree} className="bg-gray-800" />
          <Label>Is this lecture FREE</Label>
        </div>
        <div>
          <Button disabled={loading} onClick={editLectureHandler} className="bg-gray-800 hover:bg-gray-900 w-full md:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-1 w-4 h-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Update Lecture'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LectureTab
