import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import OrchidsContainer from './components/OrchidsContainer';
import Detail from './components/Detail';
import Contact from './components/Contact';
import About from './components/About';
import GoogleLogin from './auth/GoogleLogin';
import OrchidEditor from './components/OrchidEditor';
import ProtectedRoute from './auth/ProtectedRoute';
import Profile from './components/Profile';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const location = useLocation();

  // Danh sách các route KHÔNG muốn hiển thị Navigation
  const hideNavRoutes = ['/login'];

  const shouldShowNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <Navigation />} {/* Ẩn nav nếu đang ở /login */}
      <Routes>
        <Route path="/" element={<OrchidsContainer />} />
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/natural" element={<OrchidsContainer />} />
        <Route path="/special" element={<OrchidsContainer />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route
          path="/create"
          element={
            <ProtectedRoute adminOnly={true}>
              <OrchidEditor mode="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <OrchidEditor mode="edit" />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
