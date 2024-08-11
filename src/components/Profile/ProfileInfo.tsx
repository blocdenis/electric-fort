import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditIcon } from '../icons';
import styles from './Profile.module.scss';
import { getUserInfo, updateUser } from '@/services/api/api';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useState } from 'react';
import ProfileInfoForm from './ProfileInfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import classNames from 'classnames';

function ProfileInfo() {
  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const onEditClick = () => {
    setIsEditProfile((prevVal) => !prevVal);
  };
  const onPasswordEditClick = () => {
    setIsEditPassword((prevVal) => !prevVal);
  };

  if (!user) {
    return (
      <div className="border border-primary_green py-10 pr-8 pl-12 h-full">
        Loading
      </div>
    );
  }
  const {
    first_name,
    last_name,
    phone,
    email,
    activity,
    delivery_address,
    discount,
  } = user;

  return (
    <div
      className={classNames(
        '  border border-primary_green py-10 pr-8 pl-12 relative',
        { 'h-full': !isEditProfile },
        { ' h-fit mb-16': isEditProfile },
        'relative'
      )}
    >
      {!isEditProfile && (
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
            {delivery_address ? (
              <span>{`${delivery_address?.city}, ${delivery_address?.street},буд.${delivery_address?.house},кв.${delivery_address?.apartment}`}</span>
            ) : null}
          </div>
          <div className="h-10 mb-6 flex">
            <div className="w-[228px]">Вид діяльності</div>
            <span>{activity}</span>
          </div>
        </div>
      )}
      {isEditProfile && (
        <ProfileInfoForm
          handleCancelClick={() => {
            onEditClick();
            setIsEditPassword(false);
          }}
        />
      )}
      {!isEditPassword && (
        <div className="h-10 flex">
          <p className="w-[228px]">Пароль*</p>
          <span>*********</span>
          <SecondaryButton
            onClick={onPasswordEditClick}
            className="px-5 ml-[70px]"
          >
            Змінити пароль
          </SecondaryButton>
        </div>
      )}
      {isEditPassword && <ChangePasswordForm />}
      {!isEditProfile && (
        <div className={styles.edit_btn}>
          <EditIcon onClick={onEditClick} />
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
