import Image from 'next/image';
import supportIcon from '../../../public/Support.svg';
import viber from '../../../public/Viber.svg';
import styles from './SupportButton.module.scss';

function SupportButton() {
  return (
    <div className={styles.container}>
      <div className={styles.support_circle}>
        <Image src={supportIcon} width={33} height={30} alt="support" />
      </div>
      <a
        className={styles.chat_viber}
        href="viber://chat?number=%2B380501234567"
      >
        <Image src={viber} width={40} height={40} alt="viberIcon" />
        <p className=" text-black">Чат у Viber</p>
      </a>
    </div>
  );
}

export default SupportButton;
