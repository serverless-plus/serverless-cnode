import React, { Component } from 'react';
import { View } from '@ui';
import { Topic } from '@components/topic';
import { ITopic } from '@interfaces/topic';

interface IProps {
  topics: ITopic[];
}

class TopicsList extends Component<IProps, {}> {
  static defaultProps = {
    topics: [],
  };

  render() {
    const { topics } = this.props;
    const element = topics.map((topic) => {
      return <Topic key={topic.id} topic={topic}></Topic>;
    });

    return <View className='topic-list'>{element}</View>;
  }
}

export { TopicsList };
