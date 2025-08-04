import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ArrowLeft, ArrowRight, PlayCircle, Lock } from "lucide-react";
import { Card, CardContent} from "@/components/ui/card"; // Adjust imports as needed
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { setUser } from "../redux/authSlice"; // Adjust path as needed

const CourseDetails = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const courseId = params.courseId;
  const { course } = useSelector((store) => store.course);
  const { user } = useSelector((store) => store.auth);

  const selectedCourse = course?.find((course) => course._id === courseId);
 

  const [features, setFeatures] = useState([]);
  const [requirements, setRequirements] = useState([]);
  

  const [courseLecture, setCourseLecture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const [input, setInput] = useState({
    starRating: selectedCourse?.starRating || 0,
    reviewCount: selectedCourse?.reviewCount || 0,
    oldPrice: selectedCourse?.oldPrice || 0,
    targetAudience: selectedCourse?.targetAudience || "",
  });

  const isAdmin = user?.role === "instructor";
  const isStudent = user?.role === "student";
  const isAlreadyEnrolled = user?.enrolledCourses?.includes(courseId);

  
    useEffect(() => {
  if (selectedCourse) {
    // Features: convert string to array or use as-is if already array
    let featuresArray = [];
    if (Array.isArray(selectedCourse.features)) {
      featuresArray = selectedCourse.features.filter(Boolean);
    } else if (typeof selectedCourse.features === "string") {
      featuresArray = selectedCourse.features
        .split(/\r?\n|,/)
        .map((f) => f.trim())
        .filter(Boolean);
    }

    // Requirements: convert string to array or use as-is if already array
    let requirementsArray = [];
    if (Array.isArray(selectedCourse.requirements)) {
      requirementsArray = selectedCourse.requirements.filter(Boolean);
    } else if (typeof selectedCourse.requirements === "string") {
      requirementsArray = selectedCourse.requirements
        .split(/\r?\n|,/)
        .map((r) => r.trim())
        .filter(Boolean);
    }

    setFeatures(featuresArray);
    setRequirements(requirementsArray);
  }
}, [selectedCourse]);


  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/course/${courseId}/lecture`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setCourseLecture(res.data.lectures);
          setCurrentLectureIndex(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll.");
      return navigate("/login");
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendURL}/api/user/${user._id}/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Successfully enrolled!");
        dispatch(setUser(res.data.updatedUser || res.data.user));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to enroll.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendURL}/api/user/${user._id}/unenroll/${courseId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Enrollment cancelled.");
        dispatch(setUser(res.data.updatedUser));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to unenroll.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/admin/course");
  };

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-500" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const parseWhatYouWillLearn = () => {
    if (!selectedCourse?.whatYouWillLearn) return [];

    if (Array.isArray(selectedCourse.whatYouWillLearn)) {
      const flattened = selectedCourse.whatYouWillLearn.flat(Infinity);
      return flattened.filter((item) => typeof item === "string");
    }

    if (typeof selectedCourse.whatYouWillLearn === "string") {
      try {
        const parsed = JSON.parse(selectedCourse.whatYouWillLearn);
        if (Array.isArray(parsed)) {
          return parsed.filter((item) => typeof item === "string");
        }
      } catch (e) {
        return selectedCourse.whatYouWillLearn
          .split(/\r?\n|,/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    return [];
  };

  if (!selectedCourse) {
    return (
      <div className="text-center text-red-500 font-semibold mt-20">
        Course not found.
      </div>
    );
  }

  const handlePrevLecture = () => {
    setCurrentLectureIndex((idx) => (idx > 0 ? idx - 1 : idx));
  };
  const handleNextLecture = () => {
    setCurrentLectureIndex((idx) =>
      idx < courseLecture.length - 1 ? idx + 1 : idx
    );
  };

  return (
    <div className="bg-gray-100 md:p-10">
      <Card className="max-w-7xl rounded-md mx-auto bg-white shadow-md pt-5 mt-14">
        {/* Header */}
        <div className="px-4 py-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={16} />
              </Button>
              <h1 className="md:text-2xl font-bold text-gray-800">
                {selectedCourse?.courseTitle}
              </h1>
            </div>
            <div className="flex space-x-4">
              {isAdmin && (
                <Button
                  onClick={handleEdit}
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  Edit Course
                </Button>
              )}
              {isStudent &&
                (isAlreadyEnrolled ? (
                  <Button
                    onClick={handleUnenroll}
                    disabled={loading}
                    variant="destructive"
                  >
                    {loading ? "Cancelling..." : "Unenroll"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleEnroll}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {loading ? "Enrolling..." : "Enroll Now"}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <img
              src={selectedCourse?.courseThumbnail}
              alt="Thumbnail"
              className="w-full lg:w-1/3 rounded-md mb-4 lg:mb-0"
            />
            <div>
              <p className="text-gray-800 mb-4 font-semibold capitalize">
                {selectedCourse?.subTitle}
              </p>
                      {/* NEW: Category and Course Level */}
          <p className="mb-2 text-gray-600 font-medium">
            <span className="capitalize font-semibold">Category: </span>
            {selectedCourse.category || "Not specified"}
          </p>

          <p className="mb-4 text-gray-600 font-medium">
            <span className="capitalize font-semibold">Course Level: </span>
            {selectedCourse.courseLevel || "Not specified"}
          </p>
              <p 
                className="mb-4 text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedCourse?.description }}
              />
              <div className="flex items-center gap-2">
                {renderStars(input.starRating)}
                <span className="text-gray-700 font-medium">
                  ({input.starRating}) | {input.reviewCount} reviews
                </span>
              </div>
              <div className="mt-1">
                <p className="text-2xl font-bold text-gray-800">
                  {selectedCourse?.coursePrice}€
                </p>
                <p className="text-gray-500 line-through">{input.oldPrice}€</p>
              </div>
              <ul className="mt-4 space-y-2">
                {features.length > 0 ? (
                  features.map((feature, i) => (
                    <li key={i} className="text-gray-600">
                      ✔ {feature}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No features listed yet.</p>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* What You'll Learn, Requirements, Audience */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            What You'll Learn
          </h2>
          {parseWhatYouWillLearn().length > 0 ? (
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {parseWhatYouWillLearn().map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No "What You'll Learn" description added yet.
            </p>
          )}

          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Requirements
          </h2>
          {requirements.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No requirements specified for this course.
            </p>
          )}

          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Who This Course is For
          </h2>
          {input.targetAudience ? (
            <p className="text-gray-700">{input.targetAudience}</p>
          ) : (
            <p className="text-gray-500 italic">No target audience specified.</p>
          )}
        </div>

        {/* Curriculum with scrollable lecture list */}
        {courseLecture.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between gap-10 p-6">
            {/* Lectures list */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Course Curriculum
              </h2>
              <p className="text-gray-600 italic mb-4">
                {courseLecture.length} Lectures
              </p>

              <div className="space-y-3 max-h-[400px] overflow-y-auto p-2 border rounded-md bg-gray-50">
                {courseLecture.map((lecture, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                      index === currentLectureIndex
                        ? "bg-blue-100 font-semibold"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentLectureIndex(index)}
                  >
                    <span>
                      {lecture.isPreviewFree ? (
                        <PlayCircle size={20} />
                      ) : (
                        <Lock size={20} />
                      )}
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lecture preview card with navigation */}
            <div className="w-full lg:w-1/3">
              <Card>
                <CardContent className="p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={currentLectureIndex === 0}
                      onClick={handlePrevLecture}
                    >
                      <ArrowLeft size={20} />
                    </Button>
                    <span className="font-semibold">
                      {courseLecture[currentLectureIndex]?.lectureTitle ||
                        "Lecture Title"}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={
                        currentLectureIndex === courseLecture.length - 1
                      }
                      onClick={handleNextLecture}
                    >
                      <ArrowRight size={20} />
                    </Button>
                  </div>

                  <div className="w-full aspect-video mb-4">
                    <img
                      src={selectedCourse?.courseThumbnail}
                      alt={
                        courseLecture[currentLectureIndex]?.lectureTitle ||
                        "Course Image"
                      }
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <Separator className="my-2" />
                  <p className="text-gray-700">
                    {courseLecture[currentLectureIndex]?.description ||
                      "No description added yet."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

      


         {user && (
  <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div
      onClick={() => navigate("/profile")}
      className="cursor-pointer flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
    >
      <img
        src={user.photoUrl || ""}
        alt="User"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-800">
        {user.name || "No Name"}
      </h3>
      {user.role?.toLowerCase() === "student" ? (
        <p className="text-green-500 font-semibold">Enthusiastic Learner</p>
      ) : (
        <p className="text-blue-500 font-semibold">Senior Full-Stack Developer</p>
      )}
    </div>
  </div>
)}
        
      </Card>
    </div>
  );
};

export default CourseDetails;
