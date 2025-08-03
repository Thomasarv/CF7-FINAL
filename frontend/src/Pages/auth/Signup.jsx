import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup} from '@/components/ui/radio-group'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Signup = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        role:"student"
    })

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setUser((prev)=>({
            ...prev,
            [name]:value
        }))
    }



const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
        const response = await axios.post(`${backendURL}/api/user/register`, user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/login');
        } else {
            toast.error("Something went wrong");
        }
    } catch (error) {
        // Check if the error response has a message from the backend
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
        console.log(error);
    }
}

    
    
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full sm:max-w-lg md:max-w-lg'>
                <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Create Your Account</h1>
                <p className='text-center text-gray-600 mb-8'>Join us today! It's quick and easy</p>
                {/* Name input */}
                <div className='mb-4'>
                    <Label>Full Name</Label>
                    <Input 
                    placeholder="Enter Your Name" 
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    type="text"
                    id="name"
                    />
                </div>
                <div className='mb-4'>
                    <Label>Email Address</Label>
                    <Input 
                    placeholder="Enter Your Email" 
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                     />
                </div>
                <div className='mb-4'>
                    <Label>Password</Label>
                    <Input 
                    type="password"
                    placeholder="Create a Password" 
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                    />
                </div>
                <div className='mb-4'>
                    <Label>Role</Label>
                    <RadioGroup  className="flex gap-4 mt-2 peer ">
                        <div className="flex items-center space-x-2">
                            <Input 
                            type="radio" 
                            id="role1"
                            name="role"
                            value="student" 
                            checked={user.role === 'student'}
                            onChange={handleChange}
                                className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:border-blue-600 checked:bg-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               />

                            <Label htmlFor="role1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Input 
                            type="radio" 
                            id="role2"
                            name="role"
                            value="instructor"
                            checked={user.role === 'instructor'}
                            onChange={handleChange}
                              className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:border-blue-600 checked:bg-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <Label htmlFor="role2">Instructor</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Button onClick={handleSubmit}  className="w-full bg-blue-500 hover:bg-blue-600">Signup</Button>
                <p className='text-center mt-4'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Log in</Link></p>
            </div>
        </div>
    )
}

export default Signup