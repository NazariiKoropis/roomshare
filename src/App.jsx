//pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Rooms from './pages/rooms/Rooms'
import RoomDetails from './pages/roomDetails/RoomDetails'
import Resumes from './pages/resumes/Resumes'
import ResumeDetails from './pages/resumeDetails/ResumesDetails'
import NotFound from './pages/notFound/NotFound'

//protected pages
import UserProfile from './pages/user/userProfile/UserProfile'
import Admin from './pages/admin/Admin'

//user pages
import UserInfo from './pages/user/userInfo/UserInfo'
import UserRequests from './pages/user/userRequests/UserRequests'
import UserRoom from './pages/user/userRoom/UserRoom'
import UserResume from './pages/user/userResume/UserResume'

//layout
import Layout from './components/layout/Layout'

//react
import { Routes, Route } from 'react-router-dom'

//routes
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />{' '}
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:roomId" element={<RoomDetails />} />
        <Route path="resumes" element={<Resumes />} />
        <Route path="resumes/:resumeId" element={<ResumeDetails />} />
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserProfile />
            </ProtectedRoute>
          }
        >
          {' '}
          <Route index element={<UserInfo />} />
          <Route path="room" element={<UserRoom />} />
          <Route path="resume" element={<UserResume />} />
          <Route path="requests" element={<UserRequests />} />
        </Route>
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
