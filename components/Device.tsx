import React from 'react';
import styles from '../styles/Device.module.css';

const Device = ({ children }: any) =>  (
  <div className={styles.DeviceWrap}>
    <div className={styles.DeviceFigure}>
      <div className={styles.DeviceContent}>
        {children}
      </div>
    </div>
  </div>
);

export default Device;