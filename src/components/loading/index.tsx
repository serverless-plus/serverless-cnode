import React, { Component } from 'react';
import { View } from '@ui';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class Loading extends Component<{
  size;
  color;
}> {
  static defaultProps = {
    size: '18',
    color: '#fff',
  };

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { color, size } = this.props;
    const sizeStyle = {
      width: `${size}px`,
      height: `${size}px`,
    };
    const colorStyle = {
      border: `1px solid ${color}`,
      borderColor: `${color} transparent transparent transparent`,
    };
    const ringStyle = Object.assign({}, colorStyle, sizeStyle);

    return (
      <View className={styles['at-loading']} style={sizeStyle}>
        <View className={styles['at-loading__ring']} style={ringStyle} />
        <View className={styles['at-loading__ring']} style={ringStyle} />
        <View className={styles['at-loading__ring']} style={ringStyle} />
      </View>
    );
  }
}
