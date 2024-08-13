import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditIcon } from '../icons';
import { getUserInfo, updateUser } from '@/services/api/api';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useState } from 'react';
import ProfileInfoForm from './ProfileInfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import classNames from 'classnames';
import styles from './ProfileInfo.module.scss';

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
        ' pt-[90px] laptop:border laptop:border-primary_green laptop:py-10 laptop:pr-8 laptop:pl-12 relative',
        { 'h-full': !isEditProfile },
        { ' laptop:h-fit laptop:mb-16 mb-[152px]': isEditProfile },
        'relative'
      )}
    >
      {!isEditProfile && (
        <div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3">Прізвище</div>
            <span className="px-3 py-[9px] text-base">{last_name}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3">Ім’я</div>
            <span className="px-3 py-[9px] text-base">{first_name}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3">Номер телефону</div>
            <span className="px-3 py-[9px] text-base">{phone}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3">Пошта*</div>
            <span className="px-3 py-[9px] text-base">{email}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3">Адреса доставки</div>
            {delivery_address ? (
              <span className="px-3 py-[9px] text-base">{`${delivery_address?.city}, ${delivery_address?.street},буд.${delivery_address?.house},кв.${delivery_address?.apartment}`}</span>
            ) : null}
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3">Вид діяльності</div>
            <span className="px-3 py-[9px] text-base">{activity}</span>
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
        <div className="laptop:h-10 flex flex-col gap-[12px] laptop:flex-row">
          <div className="h-10 flex">
            <p className="w-[228px] text-mid">Пароль*</p>
            <span>*********</span>
          </div>
          <SecondaryButton
            onClick={onPasswordEditClick}
            className="ml-auto w-[145px] laptop:ml-[70px]"
          >
            Змінити пароль
          </SecondaryButton>
        </div>
      )}
      {isEditPassword && <ChangePasswordForm />}
      {!isEditProfile && (
        <div className={classNames(styles.edit_btn)}>
          <EditIcon onClick={onEditClick} />
        </div>
      )}
      <div className={classNames(styles.edit_btn_mobile)}>
        <EditIcon onClick={onEditClick} />
      </div>
    </div>
  );
}

export default ProfileInfo;
