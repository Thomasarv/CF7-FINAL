import React, { useState } from 'react'
import UserLogo from '../assets/user.jpg'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        name: user?.name || "",
        description: user?.description || "",
        file: null
    })
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);


    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        if (input?.file) {
            formData.append("file", input?.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`${backendURL}/api/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                setOpen(false)
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile")
        } finally {
            setLoading(false)
        }

    }

    const deleteAccountHandler = async () => {
        if (!confirmDelete) {
            toast.error("Please confirm deletion by toggling the confirmation checkbox.")
            return
        }
        try {
            setDeleteLoading(true)
            const res = await axios.delete(`${backendURL}/api/user/profile/delete`, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success("Account deleted successfully.")
                dispatch(setUser(null))
                navigate('/')  // redirect to home or login page
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete account.")
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className='bg-gray-100 py-12 px-4 sm:px-6 lg:px-0'>
            <div className='max-w-6xl mx-auto p-6 sm:p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14'>
                <div className='flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12'>
                    {/* Profile picture */}
                    <div className='w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg'>
                        <img src={user?.photoUrl || UserLogo} alt="" className='w-full h-full object-cover' />
                    </div>

                    {/* User info */}
                    <div className='text-center md:text-left flex-1 px-4 sm:px-0'>
                        <h1 className='text-4xl font-bold text-blue-500'>Welcome, {user?.name.split(" ")[0] || "User"} </h1>
                        <p className='text-lg text-gray-600 mt-3'><span className='font-bold'>Email :</span> {user?.email || "Email not available"}</p>
                        <p className='text-gray-600 my-1 capitalize'><span className='font-bold'>Role :</span> {user?.role}</p>
                        {/* <p className='text-gray-700 text-base leading-relaxed mb-3'>
                            <span className='font-bold'>Bio :</span> {user?.description || "Add Your bio"}
                        </p> */}
                                        {user?.description ? (
                        <div className='text-gray-700 text-base leading-relaxed mb-3 whitespace-pre-line break-words max-w-2xl'>
                            <span className='font-bold'>Bio :</span>{' '}
                            {isExpanded
                            ? user.description
                            : user.description.length > 200
                                ? `${user.description.slice(0, 200)}...`
                                : user.description}
                            {user.description.length > 200 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className='text-blue-500 ml-2 hover:underline text-sm'
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                            )}
                        </div>
                        ) : (
                        <p className='text-gray-700 text-base leading-relaxed mb-3'>Add your bio</p>
                        )}


                        <Dialog open={open} onOpenChange={setOpen}>
                            <Button onClick={() => setOpen(true)} className="bg-blue-500">Edit Profile</Button>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Edit Profile</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Make changes to your profile here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='grid gap-4 py-4'>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={input.name}
                                            onChange={changeEventHandler}
                                            className="col-span-3 text-gray-500"
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="description" className="text-right">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            value={input.description}
                                            onChange={changeEventHandler}
                                            name="description"
                                            className="col-span-3 text-gray-500"
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="file" className="text-right">
                                            Picture
                                        </Label>
                                        <Input
                                            id="file"
                                            type="file"
                                            accept="image/*"
                                            onChange={changeFileHandler}
                                            className="w-[277px]"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    {loading ? (
                                        <Button className="bg-blue-400" disabled>
                                            <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait
                                        </Button>
                                    ) : (
                                        <Button onClick={submitHandler} className="bg-blue-500">Save Changes</Button>
                                    )}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Delete Account Section */}
                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
                            <label className="inline-flex items-center mb-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={confirmDelete}
                                    onChange={() => setConfirmDelete(!confirmDelete)}
                                    className="form-checkbox h-5 w-5 text-red-600"
                                />
                                <span className="ml-2 text-gray-700 mr-2">I understand this will delete my account permanently.</span>
                            </label>
                            <Button
                                onClick={deleteAccountHandler}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={deleteLoading || !confirmDelete}
                            >
                                {deleteLoading ? (
                                    <>
                                        <Loader2 className="mr-2 w-4 h-4  animate-spin" /> Deleting...
                                    </>
                                ) : (
                                    "Delete Account"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
