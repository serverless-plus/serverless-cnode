import React, { Component } from 'react';
import { View } from '@ui';
import UserInfo from '@components/user-info';
import Drawer from '@components/drawer';
import Link from '@components/link';

import styles from './index.module.scss';

interface IProps {
  showMenu: boolean;
  pageType: string;
  nickName: string;
  profileUrl: string;
}

class NvMenu extends Component<IProps, {}> {
  render() {
    const { showMenu } = this.props;
    return (
      <View
        id='sideBar'
        className={`${styles['nav-list']} ${showMenu && styles.show}`}>
        <Drawer mask={false} show={showMenu}>
          <UserInfo />
          <View className={styles['list-ul']}>
            <Link
              className={`icon-quanbu iconfont ${styles.item}`}
              to={{ url: '/list?tab=all' }}>
              全部
            </Link>
            <Link
              className={`icon-hao iconfont ${styles.item}`}
              to={{ url: '/list?tab=good' }}>
              精华
            </Link>
            <Link
              className={`icon-fenxiang iconfont ${styles.item}`}
              to={{ url: '/list?tab=share' }}>
              分享
            </Link>
            <Link
              className={`icon-wenda iconfont ${styles.item}`}
              to={{ url: '/list?tab=ask' }}>
              问答
            </Link>
            <Link
              className={`icon-zhaopin iconfont ${styles.item}`}
              to={{ url: '/list?tab=job' }}>
              招聘
            </Link>
            <Link
              className={`icon-xiaoxi iconfont ${styles.item}`}
              to={{ url: '/message' }}>
              消息
            </Link>
            <Link
              className={`icon-about iconfont ${styles.item}`}
              to={{ url: '/about' }}>
              关于
            </Link>
          </View>
        </Drawer>
      </View>
    );
  }
}

export default NvMenu;
