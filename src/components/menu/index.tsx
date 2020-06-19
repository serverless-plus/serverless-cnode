import React, { Component } from 'react';
import { View } from '@ui';
import UserInfo from '@components/user-info';
import classNames from 'classnames';
import Drawer from '@components/drawer';
import Link from '@components/link';

import './index.scss';

interface IProps {
  showMenu: boolean;
  pageType: string;
  nickName: string;
  profileUrl: string;
}

class NvMenu extends Component<IProps, {}> {
  render() {
    const { showMenu } = this.props;
    const classnames = classNames({
      'nav-list': true,
      show: showMenu,
    });
    return (
      <View id='sideBar' className={classnames}>
        <Drawer mask={false} show={showMenu}>
          <UserInfo />
          <View className='list-ul'>
            <Link
              className='icon-quanbu iconfont item'
              to={{ url: '/list?tab=all' }}>
              全部
            </Link>
            <Link
              className='icon-hao iconfont item'
              to={{ url: '/list?tab=good' }}>
              精华
            </Link>
            <Link
              className='icon-fenxiang iconfont item'
              to={{ url: '/list?tab=share' }}>
              分享
            </Link>
            <Link
              className='icon-wenda iconfont item'
              to={{ url: '/list?tab=ask' }}>
              问答
            </Link>
            <Link
              className='icon-zhaopin iconfont item'
              to={{ url: '/list?tab=job' }}>
              招聘
            </Link>
            <Link
              className='icon-xiaoxi iconfont item line'
              to={{ url: '/message' }}>
              消息
            </Link>
            <Link className='icon-about iconfont item' to={{ url: '/about' }}>
              关于
            </Link>
          </View>
        </Drawer>
      </View>
    );
  }
}

export default NvMenu;
