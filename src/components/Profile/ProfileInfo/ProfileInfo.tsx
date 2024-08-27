import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditIcon } from '../../icons';
import { getUserInfo, updateUser } from '@/services/api/api';
import SecondaryButton from '../../Buttons/SecondaryButton';
import { useState } from 'react';
import ChangePasswordForm from './ProfileInfoForms/ChangePasswordForm';
import classNames from 'classnames';
import styles from './ProfileInfo.module.scss';
import ProfileInfoForm from './ProfileInfoForms/ProfileInfoForm';

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
            <div className="laptop:w-[228px] mb-3 laptop:mb-0">Прізвище</div>
            <span className="px-3 py-[9px] text-base">{last_name}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3 laptop:mb-0">Ім’я</div>
            <span className="px-3 py-[9px] text-base">{first_name}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3 laptop:mb-0">
              Номер телефону
            </div>
            <span className="px-3 py-[9px] text-base">{phone}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3 laptop:mb-0">Пошта*</div>
            <span className="px-3 py-[9px] text-base">{email}</span>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3 laptop:mb-0">
              Адреса доставки
            </div>
            <div className="px-3 py-[9px] laptop:max-w-[74%]">
              {delivery_address?.city && (
                <span className=" text-base">{delivery_address?.city}</span>
              )}
              {delivery_address?.city && delivery_address.street ? (
                <span>, </span>
              ) : null}
              {delivery_address?.street && (
                <span className="text-base">
                  вул.{delivery_address?.street}
                </span>
              )}
              {(delivery_address?.city && delivery_address.house) ||
              (delivery_address?.street && delivery_address.house) ? (
                <span>, </span>
              ) : null}
              {delivery_address?.house && (
                <span className="text-base">буд.{delivery_address?.house}</span>
              )}
              {(delivery_address?.city && delivery_address.apartment) ||
              (delivery_address?.street && delivery_address.apartment) ||
              (delivery_address?.house && delivery_address.apartment) ? (
                <span>, </span>
              ) : null}
              {delivery_address?.apartment && (
                <span className="text-base">
                  кв.{delivery_address?.apartment}
                </span>
              )}
            </div>
          </div>
          <div className={styles.profile_info_item}>
            <div className="laptop:w-[228px] mb-3 laptop:mb-0">
              Вид діяльності
            </div>
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
            <span className=" py-[9px] px-3">*********</span>
          </div>
          <SecondaryButton
            onClick={onPasswordEditClick}
            className="ml-auto w-[145px] laptop:ml-[70px]"
          >
            Змінити пароль
          </SecondaryButton>
        </div>
      )}
      {isEditPassword && (
        <ChangePasswordForm
          handleCancelClick={() => setIsEditPassword(false)}
        />
      )}
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
