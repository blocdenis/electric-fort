import { useQuery } from '@tanstack/react-query';
import { EditIcon } from '../icons';
import styles from './Profile.module.scss';
import { getUserInfo } from '@/services/api/api';
import SecondaryButton from '../Buttons/SecondaryButton';

function ProfileInfo() {
  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });
  console.log(user);
  if (!user) {
    return <div>Loading</div>;
  }
  const { first_name, last_name, phone, email, activity } = user;

  return (
    <div className=" relative">
      <div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Прізвище</div>
          <span>{last_name}</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Ім’я</div>
          <span>{first_name}</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Номер телефону</div>
          <span>{phone}</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Пошта*</div>
          <span>{email}</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Адреса доставки</div>
          {/* delivery address from order ? */}
          <span>м. Вінниця, вул.Ааааааааааааа, буд.1, кв.1</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Вид діяльності</div>
          <span>{activity}</span>
        </div>
        <div className="h-10 flex">
          <div className="w-[228px]">Пароль*</div>
          <span>*********</span>
          <SecondaryButton className="px-5 ml-[70px]">
            Змінити пароль
          </SecondaryButton>
        </div>
      </div>
      <div></div>
      <div className={styles.edit_btn}>
        <EditIcon />
      </div>
    </div>
  );
}

export default ProfileInfo;
