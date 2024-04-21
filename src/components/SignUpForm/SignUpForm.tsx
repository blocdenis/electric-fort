import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import EyeIcon from '../icons/EyeIcon';
import styles from './SignUpForm.module.scss';
import GoogleIcon from '../icons/GoogleIcon';
import Link from 'next/link';

type Inputs = {
  phone: string;
  password: string;
  confirm_password: string;
};

export default function SignUpForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Номер телефону</label>
        <input placeholder="+380 (__)___-__-__" {...register('phone')} />
        <div className={styles.password_container}>
          <label>Пароль</label>
          <input
            placeholder="Пароль (не менше 6 символів)"
            type={passwordShown ? 'text' : 'password'}
            {...register('password', {
              required: true,
            })}
          />
          <EyeIcon
            className={styles.eye_icon}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <div className={styles.password_container}>
          <label>Повторити пароль</label>
          <input
            placeholder="Пароль (не менше 6 символів)"
            type={passwordShown ? 'text' : 'password'}
            {...register('confirm_password', {
              // required: true,
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Your passwords do not match';
                }
              },
            })}
          />
          <EyeIcon
            className={styles.eye_icon}
            onClick={togglePasswordVisiblity}
          />
        </div>
        <div className={styles.policy_container}>
          {' '}
          <input type="checkbox" />{' '}
          <Link href="/return_policy">
            Я приймаю умови користувальницької угоди
          </Link>
        </div>

        {errors.password && (
          <span className={styles.error_message}>Це поле обовязкове</span>
        )}
        <input type="submit" value="Зареєструватися" />
      </form>
      <button className={styles.btn}>Увійти</button>
      <div className={styles.seperate_container}>
        <div className={styles.line}></div>
        <span>або</span>
        <div className={styles.line}></div>
      </div>
      <button
        className={styles.google_container}
        onClick={() => console.log('google')}
      >
        <GoogleIcon className={styles.icon} />
      </button>
    </div>
  );
}
