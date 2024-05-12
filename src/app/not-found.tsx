import Error from '@/components/Error/Error';
import error404 from './../../public/404.png';

export default function NotFound() {
  return (
    <Error
      errorCode={error404}
      errorText="Сторінка, яку Ви шукали, не існує, або Ви ввели невірний URL"
    />
  );
}
