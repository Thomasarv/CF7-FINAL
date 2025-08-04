import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { setCourses } from '@/redux/courseSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseTab = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const params = useParams()
  const id = params.courseId
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const course = useSelector((store) => store.course.course)

  const selectCourse = course && course._id === id ? course : null

  const [selectedCourse, setSelectedCourse] = useState(selectCourse)
  const [loading, setLoading] = useState(false)
  const [publish, setPublish] = useState(selectCourse?.isPublished ?? false)

  const getCourseById = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/course/${id}`, { withCredentials: true })
      if (res.data.success) {
        setSelectedCourse(res.data.course)
        setPublish(res.data.course.isPublished)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load course data')
    }
  }

  useEffect(() => {
    if (!selectCourse) {
      getCourseById()
    } else {
      setSelectedCourse(selectCourse)
      setPublish(selectCourse.isPublished)
    }
  }, [id, selectCourse])

  const [input, setInput] = useState({
    courseTitle: '',
    subTitle: '',
    description: '',
    category: '',
    courseLevel: '',
    coursePrice: 0,
    starRating: 0,
    reviewCount: 0,
    oldPrice: 0,
    targetAudience: '',
    features: '',
    requirements: '',
    whatYouWillLearn: '',
    courseThumbnail: null,
  })

  const [previewThumbnail, setPreviewThumbnail] = useState('')

  useEffect(() => {
    if (selectedCourse) {
      setInput({
        courseTitle: selectedCourse.courseTitle || '',
        subTitle: selectedCourse.subTitle || '',
        description: selectedCourse.description || '',
        category: selectedCourse.category || '',
        courseLevel: selectedCourse.courseLevel || '',
        coursePrice: selectedCourse.coursePrice || 0,
        starRating: selectedCourse.starRating || 0,
        reviewCount: selectedCourse.reviewCount || 0,
        oldPrice: selectedCourse.oldPrice || 0,
        targetAudience: selectedCourse.targetAudience || '',
        features: selectedCourse.features || '',
        requirements: selectedCourse.requirements || '',
        whatYouWillLearn: selectedCourse.whatYouWillLearn || '',
        courseThumbnail: null,
      })
      setPreviewThumbnail(selectedCourse.courseThumbnail || '')
      setPublish(selectedCourse.isPublished)
    }
  }, [selectedCourse])

 
  const selectCategory = (value) => {
    setInput({ ...input, category: value })
  }

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value })
  }

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setInput({ ...input, courseThumbnail: file })
      const fileReader = new FileReader()
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
      fileReader.readAsDataURL(file)
    }
  }



  const updateCourseHandler = async () => {
  // Check for empty required fields
  const requiredFields = [
    'courseTitle',
    'subTitle',
    'description',
    'category',
    'courseLevel',
    'targetAudience',
    'features',
    'requirements',
    'whatYouWillLearn'
  ]

  const missingFields = requiredFields.filter(field => !input[field]?.trim())

  if (missingFields.length > 0) {
    toast.error('Please fill in all required fields.')
    return
  }



  const formData = new FormData()
  formData.append('courseTitle', input.courseTitle)
  formData.append('subTitle', input.subTitle)
  formData.append('description', input.description)
  formData.append('category', input.category)
  formData.append('courseLevel', input.courseLevel)
  formData.append('coursePrice', input.coursePrice)
  formData.append('starRating', input.starRating)
  formData.append('reviewCount', input.reviewCount)
  formData.append('oldPrice', input.oldPrice)
  formData.append('targetAudience', input.targetAudience)
  formData.append('features', input.features)
  formData.append('requirements', input.requirements)
  formData.append('whatYouWillLearn', input.whatYouWillLearn)
  if (input.courseThumbnail) {
    formData.append('file', input.courseThumbnail)
  }

  try {
    setLoading(true)
    const res = await axios.put(`${backendURL}/api/course/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    if (res.data.success) {
      toast.success(res.data.message)
      setSelectedCourse(res.data.course)
      dispatch(setCourses(res.data.course))
      navigate(`/admin/course/${id}/lecture`)
    
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to update course')
  } finally {
    setLoading(false)
  }
}


 


  const togglePublishUnpublish = async () => {
  if (!publish) {
    // Trying to publish – check for required fields
    const requiredFields = [
      'courseTitle',
      'subTitle',
      'description',
      'category',
      'courseLevel',
      'targetAudience',
      'features',
      'requirements',
      'whatYouWillLearn'
    ]

    const missingFields = requiredFields.filter(field => !input[field]?.trim())
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields before publishing.')
      return
    }
  }

  try {
    const action = publish ? 'false' : 'true'
    const res = await axios.patch(
      `${backendURL}/api/course/${id}`,
      { action },
      { withCredentials: true }
    )

    if (res.data.success) {
      setPublish(!publish)
      toast.success(res.data.message)
      setSelectedCourse((prev) => ({ ...prev, isPublished: !publish }))
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to update publish status')
  }
}


  const removeCourseHandler = async () => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return

    try {
      setLoading(true)
      const res = await axios.delete(`${backendURL}/api/course/${id}`, {
        withCredentials: true,
      })

      if (res.data.success) {
        toast.success('Course removed successfully')
        dispatch(setCourses(null))
        navigate('/admin/course')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to remove course')
    } finally {
      setLoading(false)
    }
  }

  const changeEventHandler = (e) => {
  const { name, value } = e.target

  if (name === 'coursePrice') {
    if (Number(value) < 0) {
      toast.error('Price must be greater than or equal to 0')
      return
    }
  }

  if (name === 'starRating') {
    const val = Number(value)
    if (val < 0 || val > 5) {
      toast.error('Star rating must be between 0 and 5')
      return
    }
  }

  if (name === 'reviewCount') {
    if (Number(value) < 0) {
      toast.error('Review count cannot be negative')
      return
    }
  }

  if (name === 'oldPrice') {
    if (Number(value) < 0) {
      toast.error('Old price must be greater than or equal to 0')
      return
    }
  }

  setInput({ ...input, [name]: value })
}


  return (
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            onClick={togglePublishUnpublish}
            className="bg-gray-800 hover:bg-gray-800"
          >
            {publish ? 'UnPublish' : 'Publish'}
          </Button>
          <Button variant="destructive" onClick={removeCourseHandler}>
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              value={input.courseTitle}
              onChange={changeEventHandler}
              type="text"
              name="courseTitle"
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={input.subTitle}
              onChange={changeEventHandler}
              type="text"
              name="subTitle"
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={input.description}
              onChange={changeEventHandler}
              type="text"
              name="description"
              placeholder="Describe your course"
            />
          </div>

          <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="Next.js">Next.js</SelectItem>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="SQL Database">SQL Databases</SelectItem>
                        <SelectItem value="Angular">Angular</SelectItem>
                        <SelectItem value="Java">Java</SelectItem>
                        <SelectItem value="Javascript">Javascript</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Docker">Docker</SelectItem>
                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                        <SelectItem value="C#">C#</SelectItem>
                        <SelectItem value="Node.js">Node.js</SelectItem>
                        <SelectItem value="AI">AI</SelectItem>
                        <SelectItem value="Web">Web</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (EUR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
                min={0}
              />
            </div>
            <div>
              <Label>Old Price in (EUR)</Label>
              <Input
                type="number"
                name="oldPrice"
                value={input.oldPrice}
                onChange={changeEventHandler}
                placeholder="299"
                className="w-fit"
                min={0}
              />
            </div>
            <div>
              <Label>Star Rating (0-5)</Label>
              <Input
                type="number"
                name="starRating"
                value={input.starRating}
                onChange={changeEventHandler}
                min={0}
                max={5}
                step={0.1}
                className="w-fit"
              />
            </div>
            <div>
              <Label>Review Count</Label>
              <Input
                type="number"
                name="reviewCount"
                value={input.reviewCount}
                onChange={changeEventHandler}
                min={0}
                className="w-fit"
              />
            </div>
          </div>

          <div>
            <Label>Target Audience</Label>
            <Input
              type="text"
              name="targetAudience"
              value={input.targetAudience}
              onChange={changeEventHandler}
              placeholder="Who is this course for?"
            />
          </div>

          <div>
            <Label>Features</Label>
            <textarea
              name="features"
              value={input.features}
              onChange={(e) => setInput({ ...input, features: e.target.value })}
              rows={3}
              className="w-full border rounded p-2"
              placeholder="List the features of the course"
            />
          </div>

          <div>
            <Label>Requirements</Label>
            <textarea
              name="requirements"
              value={input.requirements}
              onChange={(e) => setInput({ ...input, requirements: e.target.value })}
              rows={3}
              className="w-full border rounded p-2"
              placeholder="List the requirements for the course"
            />
          </div>

          <div>
            <Label>What You Will Learn</Label>
            <textarea
              name="whatYouWillLearn"
              value={input.whatYouWillLearn}
              onChange={(e) => setInput({ ...input, whatYouWillLearn: e.target.value })}
              rows={3}
              className="w-full border rounded p-2"
              placeholder="What will students learn?"
            />
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              id="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} alt="Thumbnail" className="w-64 my-2" />
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/course')} variant="outline">
              Cancel
            </Button>
            <Button
              className="bg-gray-800 hover:bg-gray-800"
              disabled={loading}
              onClick={updateCourseHandler}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab
