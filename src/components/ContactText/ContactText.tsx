import React from 'react'
import { PhoneIcon } from '../icons'
import styles from './ContactText.module.scss'

const ContactText: React.FC = () => {
  return (
    <div className={styles.container}>
      <PhoneIcon />
      <span>+38(000) 000-00-00</span>
    </div>
  )
}

export default ContactText
