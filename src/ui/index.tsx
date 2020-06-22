import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

export const View = (props) => {
  const { children, className, ...reset } = props;
  return (
    <div className={className} {...reset}>
      {children}
    </div>
  );
};

export const ScrollView = (props) => {
  const { children, className, ...reset } = props;
  return (
    <div className={className} {...reset}>
      {children}
    </div>
  );
};

export const Text = (props) => {
  const { children, className, ...reset } = props;
  return (
    <span className={className} {...reset}>
      {children}
    </span>
  );
};

interface Imageprops {
  src: string;
  mode?: 'widthFix' | 'scaleToFill';
  onLoad?: React.ReactEventHandler;
  onError?: React.ReactEventHandler;
  style?: any;
  className?: string;
}

export const Image = ({
  className,
  src,
  style,
  mode,
  onLoad,
  onError,
  ...reset
}: Imageprops) => {
  const cls = classNames(
    styles['taro-img'],
    mode === 'widthFix' && style['taro-img__widthfix'],
    className,
  );
  const imgCls =
    'taro-img__mode-' +
    (mode || 'scaleToFill').toLowerCase().replace(/\s/g, '');

  return (
    <div className={cls} style={style} {...reset}>
      <img
        className={styles[imgCls]}
        src={src}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};
