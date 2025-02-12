'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import EyeIcon from '../icons/EyeIcon';
import styles from './SignUpForm.module.scss';
import GoogleIcon from '../icons/GoogleIcon';
import Link from 'next/link';
import axios from 'axios';
import { URL } from '@/constants';
import CloseEyeIcon from '../icons/CloseEyeIcon';
import CheckboxTrue from '../icons/CheckboxTrue';
import CheckboxFalse from '../icons/CheckboxFalse';
import { useAuth } from '@/context/AuthContext';
import { regexEmail, regexPassword } from '@/lib/schemas/validationZodSchemas';

type Inputs = {
  email: string;
  password: string;
  confirm_password?: string;
};

type RegisterData = {
  email: string;
  password: string;
};

type LoginData = {
  credential: string;
  password: string;
};

const registerUser = async (data: RegisterData) => {
  const response = await axios.post(`${URL}/user/register`, data, {
    withCredentials: true,
  });
  return response.data;
};

const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${URL}/user/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export default function SignUpForm({
  closeModal,
  isRegistrationForm,
}: {
  closeModal: () => void;
  isRegistrationForm: boolean;
}) {
  const { setIsAuthenticated } = useAuth();
  const [isRegistration, setIsRegistration] = useState(isRegistrationForm);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (isRegistration) {
        const response = await registerUser({
          email: data.email,
          password: data.password,
        });
        console.log('Registration Success:', response);
      } else {
        const response = await loginUser({
          credential: data.email,
          password: data.password,
        });
        console.log('Login Success:', response);
        console.log('Cookies after login:', document.cookie);
        setIsAuthenticated(true);
      }
      reset();
      closeModal();
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Електронна пошта</label>
        <input
          placeholder="Введіть електронну пошту"
          // {...register('email', { required: true })}
          {...register('email', {
            required: { value: true, message: "Це поле обов'язкове" },
            // pattern: {
            //   value: regexEmail,
            //   message: 'Email адреса вказана неправильно',
            // },
          })}
        />
        {errors.email && (
          <span className={styles.error_message}>{errors.email.message}</span>
        )}
        <div className={styles.password_container}>
          <label>Пароль</label>
          <input
            placeholder="Пароль (не менше 8 символів)"
            type={passwordShown ? 'text' : 'password'}
            // {...register('password', { required: true })}
            {...register('password', {
              required: { value: true, message: "Це поле обов'язкове" },
              minLength: {
                value: 8,
                message: 'Пароль має містити не меньше 8 символів',
              },
              // pattern: {
              //   value: regexPassword,
              //   message:
              //     'Пароль має містити щонайменьше одну заглавну літеру та один спеціальний символ',
              // },
            })}
          />
          {passwordShown ? (
            <CloseEyeIcon
              className={styles.eye_icon}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeIcon
              className={styles.eye_icon}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {errors.password && (
          <span className={styles.error_message}>
            {errors.password.message}
          </span>
        )}
        {!isRegistration && (
          <div className={styles.policy_container}>
            <label className={styles.checkbox_container}>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
              />
              {checked ? <CheckboxTrue /> : <CheckboxFalse />}
            </label>
            <div className={styles.text_container}>
              <span>Запам’ятати мене</span>
              <span>Забули пароль?</span>
            </div>
          </div>
        )}
        {isRegistration && (
          <>
            <div className={styles.password_container}>
              <label>Повторити пароль</label>
              <input
                placeholder="Повторити пароль"
                type={passwordShown ? 'text' : 'password'}
                {...register('confirm_password', {
                  required: true,
                  validate: (val: string | undefined) => {
                    if (watch('password') !== val) {
                      return 'Пароль має співпадати';
                    }
                  },
                })}
              />
              {passwordShown ? (
                <CloseEyeIcon
                  className={styles.eye_icon}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeIcon
                  className={styles.eye_icon}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.confirm_password && (
              <span className={styles.error_message}>
                {errors.confirm_password.message}
              </span>
            )}
            <div className={styles.policy_container}>
              <label className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                {checked ? <CheckboxTrue /> : <CheckboxFalse />}
              </label>

              <Link href="/oferta">
                Я приймаю умови користувальницької угоди
              </Link>
            </div>
          </>
        )}
        <input
          type="submit"
          value={
            loading
              ? 'Завантаження...'
              : isRegistration
              ? 'Зареєструватися'
              : 'Увійти'
          }
          disabled={loading}
        />
      </form>
      {error && <span className={styles.error_message}>{error}</span>}
      {!isRegistration && (
        <button className={styles.btn} onClick={() => setIsRegistration(true)}>
          Зареєструватися
        </button>
      )}
      {isRegistration && (
        <button className={styles.btn} onClick={() => setIsRegistration(false)}>
          Увійти
        </button>
      )}
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
