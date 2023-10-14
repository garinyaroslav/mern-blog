import React from 'react';
import styles from './UserInfo.module.scss';

interface UserInfoProps {
  avatarUrl?: string | null;
  fullName?: string;
  createdAt?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ avatarUrl, fullName, createdAt }) => {
  const time = createdAt?.slice(11, 16).split(':').join('.');
  const date = createdAt?.slice(0, 10).split('-').reverse().join('.');
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{`${time} ${date}`}</span>
      </div>
    </div>
  );
};
