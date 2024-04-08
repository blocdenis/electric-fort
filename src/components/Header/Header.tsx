import React from 'react'
import {
  CartIcon,
  HeartIcon,
  InstagramIcon,
  MainLogo,
  PhoneIcon,
  TikTokIcon,
} from '../icons'
import styles from './Header.module.scss'
const Header = () => {
  return (
    // TO DO
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <TikTokIcon />
            <InstagramIcon />
          </div>
          <div>
            <span>UA</span>
            <span>RU</span>
          </div>
          <div>
            <h1>Увийты</h1>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <MainLogo />
          <h2>Elektrychna Fortecia </h2>
        </div>
        {/* TO DO */}
        <div>
          <PhoneIcon />
          <span>+38(000) 000-00-00</span>
          <PhoneIcon />
          <span>+38(000) 000-00-00</span>
          <input type="text" name="" id="" />
        </div>
        <div>
          <HeartIcon />
          <CartIcon />
        </div>
      </div>
    </header>
  )
}

export default Header
