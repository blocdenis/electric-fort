import { EditIcon } from '../icons';
import styles from './Profile.module.scss';

function ProfileInfo() {
  return (
    <div className=" relative">
      <div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Прізвище</div>
          <span>ФФФФФФФФ</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Ім’я</div>
          <span>ФФФФФФФФ</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Номер телефону</div>
          <span>+3 8(011) 111-11-11</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Пошта*</div>
          <span>Dfnjdy@gmail.com</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Адреса доставки</div>
          <span>м. Вінниця, вул.Ааааааааааааа, буд.1, кв.1</span>
        </div>
        <div className="h-10 mb-6 flex">
          <div className="w-[228px]">Вид діяльності</div>
          <span>Електрик</span>
        </div>
        <div className="h-10 flex">
          <div className="w-[228px]">Пароль*</div>
          <span>*********</span>
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
