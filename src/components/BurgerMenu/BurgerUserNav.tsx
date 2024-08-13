import Link from 'next/link';
import { ProfileIcon } from '../icons';
import { getUserInfo } from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';

function BurgerUserhNav() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });
  return (
    <div className=" pl-2 text-black flex items-center">
      <div className="w-[48px] h-[48px] flex justify-center items-center mr-3">
        <ProfileIcon width={34} height={34} className="[&_*]:stroke-black" />
      </div>
      <p>{user?.email}</p>
    </div>
  );
}

export default BurgerUserhNav;
