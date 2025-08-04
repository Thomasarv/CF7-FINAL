import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCourses } from '@/redux/courseSlice'
import { Badge } from '@/components/ui/badge'
import { Edit } from 'lucide-react'

const Course = () => {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { course } = useSelector(store => store.course)

  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/course/`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setCourses(res.data.courses))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCreatorCourse()
  }, [dispatch])

  const courseList = Array.isArray(course) ? course : []

  return (
    <div className="md:p-10 p-4 w-full min-h-screen pb-20">
      <Button className="bg-blue-500" onClick={() => navigate('create')}>
        Create Course
      </Button>

      <div className="overflow-x-auto mt-10">
        <Table>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Course</TableHead>
              <TableHead className="hidden md:table-cell text-right">Price</TableHead>
              <TableHead className="hidden md:table-cell text-center">Status</TableHead>
              <TableHead className="hidden md:table-cell text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseList.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="md:w-[300px] flex flex-col md:flex-row md:items-center gap-2">
                  <img
                    src={course?.courseThumbnail}
                    alt="Thumbnail"
                    className="w-20 rounded-sm mb-2 md:mb-0 md:mr-2"
                  />
                  <div>
                    <div>{course.courseTitle}</div>

                    {/* Mobile-only: show price */}
                    <div className="text-sm text-gray-600 md:hidden">
                      Price: {course.coursePrice || "NA"}
                    </div>

                    {/* Mobile-only: show status badge */}
                    <Badge
                      className={`${course.isPublished ? "bg-green-400" : "bg-red-400"} md:hidden mt-1`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>

                    {/* Mobile-only: show action button */}
                    <Button
                      variant="ghost"
                      className="md:hidden p-0 mt-1"
                      onClick={() => navigate(`/admin/course/${course._id}`)}
                    >
                      <Edit size={18} />
                    </Button>
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell font-medium text-right">
                  {course.coursePrice || "NA"}
                </TableCell>

                <TableCell className="hidden md:table-cell text-center">
                  <Badge className={course.isPublished ? "bg-green-400" : "bg-red-400"}>
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="hidden md:table-cell text-right">
                  <Button variant="ghost" onClick={() => navigate(`/admin/course/${course._id}`)}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Course
