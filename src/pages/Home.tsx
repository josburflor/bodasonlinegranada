import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import Hero from '../components/home/Hero';
import Team from '../components/home/Team';
import Calendar from '../components/home/Calendar';
import Categories from '../components/home/Categories';
import Featured from '../components/home/Featured';
import Blog from '../components/home/Blog';
import Routes from '../components/home/Routes';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && userProfile) {
      if (userProfile.role === 'admin') navigate('/admin');
      else if (userProfile.role === 'vendor') navigate('/panel-proveedor');
      else navigate('/mi-boda');
    }
  }, [user, userProfile, loading]);

  return (
    <main className="min-h-screen">
      <Hero />
      <Team />
      <Calendar />
      <Categories />
      <Featured />
      <Blog />
      <Routes />
      <Testimonials />
    </main>
  );
}
