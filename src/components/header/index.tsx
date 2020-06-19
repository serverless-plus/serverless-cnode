import React, { Component } from 'react';
import classNames from 'classnames';
import { View, Text } from '@ui';
import NvMenu from '../menu';
import Link from '../link';

import './index.scss';

type IProps = {
  pageType: string;
  fixHead: boolean;
  messageCount?: number;
  scrollTop?: number;
  needAdd?: boolean;
  showMenu?: boolean;
};

interface IState {
  nickname: string;
  profileimgurl: string;
  show: boolean;
}

class Header extends Component<IProps, IState> {
  static defaultProps = {
    messageCount: 0,
    scrollTop: 0,
    needAdd: false,
    showMenu: true,
  };

  state = {
    nickname: '',
    profileimgurl: '',
    show: false,
  };

  openMenu = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  showMenus = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { show, nickname, profileimgurl } = this.state;
    const { needAdd, pageType, fixHead, messageCount } = this.props;
    const classnames = classNames({
      show: show && fixHead,
      'fix-header': fixHead,
      'no-fix': !fixHead,
    });
    return (
      <View className='header'>
        {show && fixHead ? (
          <View>
            <View className='page-cover' onClick={this.showMenus} />
          </View>
        ) : (
          ''
        )}
        <View className={classnames} id='hd'>
          <View className='nv-toolbar'>
            {fixHead ? (
              <View className='toolbar-nav' onClick={this.openMenu} />
            ) : (
              ''
            )}
            <Text>{pageType}</Text>
            {messageCount > 0 ? (
              <Text className='num'>{messageCount}</Text>
            ) : (
              ''
            )}
            {(needAdd && !messageCount) || messageCount <= 0 ? (
              <Link className='iconfont add-icon' to={{ url: '/add' }}>
                &#xe60f;
              </Link>
            ) : (
              ''
            )}
          </View>
        </View>
        <NvMenu
          showMenu={show}
          pageType={pageType}
          nickName={nickname}
          profileUrl={profileimgurl}
        />
        {/* {fixHead ? "" : ""} */}
      </View>
    );
  }
}

export default Header;
