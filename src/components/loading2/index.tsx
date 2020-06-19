import { View } from '@ui';
import { Component } from 'react';
import ActivityIndicator from '@components/activityIndicator';
import './index.scss';

export default class Loading extends Component<{
  height: string;
}> {
  render() {
    const { height = '8rem' } = this.props;
    return (
      <View className='loading2' style={{ minHeight: height, height }}>
        <ActivityIndicator color='#9d8352' />
      </View>
    );
  }
}
