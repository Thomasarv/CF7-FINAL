import { Button } from '@/components/ui/button'
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
} from "@/components/ui/select"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateCourse = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")

    const getSelectedCategory = (value)=> {
        setCategory(value)
    }
   


      const createCourseHandler = async () => {
        if (!courseTitle.trim() || !category.trim()) {
          toast.error("Please fill in both the course title and category.")
          return
        }

        try {
          setLoading(true)
          const res = await axios.post(`${backendURL}/api/course/`, { courseTitle, category }, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          })

          if (res.data.success) {
            navigate('/admin/course')
            toast.success(res.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error("Failed to create course.")
        } finally {
          setLoading(false)
        }
      }

    return (
        <div className='p-10 md:pr-20 h-screen'>
            <h1 className='text-2xl font-bold'>Add New <span className='text-blue-500'>Courses</span></h1>
            <p>Create engaging new learning experiences by adding your own course content, descriptions, and media.</p>
            <div className='mt-10'>
                <div>
                    <Label>Title</Label>
                    <Input 
                    type="text" 
                    value={courseTitle} 
                    onChange={(e)=>setCourseTitle(e.target.value)} 
                    placeholder="Your Course Name" 
                    className="bg-white" 
                    />
                </div>
                <div className='mt-4 mb-5'>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px] bg-white">
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
                <div className='flex gap-2'>
                    <Button onClick={()=>navigate('/admin/course')} variant="outline">Cancel</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 " disabled={loading} onClick={createCourseHandler}>
                    {
                        loading ? <><Loader2 className='animate-spin mr-1 h-4 w-4 '/>Please wait</> : "Create"
                    }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse