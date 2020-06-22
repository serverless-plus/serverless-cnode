import React, { Component } from 'react';
import { View, Text, Image } from '@ui';
import Link from '@components/link';

// import api from '../lib/utils/api'
import * as utils from '@libs/utils';
import { ITopic } from '@interfaces/topic';

import styles from './index.module.scss';

interface IProps {
  topic: ITopic;
  key: string;
}

class Topic extends Component<IProps, {}> {
  getTabInfo(tab, good, top, isClass) {
    return utils.getTabInfo(tab, good, top, isClass);
  }
  render() {
    const {
      title,
      tab,
      good,
      top,
      author,
      visit_count,
      reply_count,
      create_at,
      last_reply_at,
      id,
    } = this.props.topic;

    const classnames = 'stitle ' + this.getTabInfo(tab, good, top, true);
    const tit = this.getTabInfo(tab, good, top, false);
    return (
      <Link className={styles.topic} to={{ url: '/topic?id=' + id }}>
        <h3 className={classnames} title={tit}>
          {title}
        </h3>
        <View className='content'>
          <View>
            <Image src={author.avatar_url} className={styles.avatar} />
          </View>
          <View className={styles.info}>
            <View>
              <View className='name'>{author.loginname}</View>
              {reply_count > 0 ? (
                <Text className='status'>
                  <b>{reply_count}</b>/ <Text>{visit_count}</Text>
                </Text>
              ) : (
                ''
              )}
            </View>
            <View>
              <Text className='time'>
                {utils.getLastTimeStr(create_at, true)}
              </Text>
              <Text className='time'>
                {utils.getLastTimeStr(last_reply_at, true)}
              </Text>
            </View>
          </View>
        </View>
      </Link>
    );
  }
}

export { Topic };
