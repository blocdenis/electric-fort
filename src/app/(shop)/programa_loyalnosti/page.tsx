'use client';
import { useAuth } from '@/context/AuthContext';

function Page() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated + 'якщо тру то користувач живий ');
  if (!isAuthenticated) {
    return <div>Пользователь не аутентифицирован</div>;
  }
  return <div>Програма лояльності</div>;
}

export default Page;
