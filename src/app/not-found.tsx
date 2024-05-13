import NotFoundError from '@/components/Error/NotFoundError';

export default function NotFound() {
  return (
    <NotFoundError errorText="Сторінка, яку Ви шукали, не існує, або Ви ввели невірний URL" />
  );
}
