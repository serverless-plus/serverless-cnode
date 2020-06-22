// import { ComponentClass } from 'react'
import React, { Component } from 'react';
import { View, Image, Text } from '@ui';
import Link from '@components/link';
import { connect } from 'react-redux';
import * as actions from '@actions/auth';
import { IAuth } from '@interfaces/auth';

type PageStateProps = {
  userInfo: IAuth;
};

type PageDispatchProps = {
  authCheckState: () => void;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

class UserInfo extends Component<IProps, PageState> {
  componentWillMount() {
    this.props.authCheckState();
  }
  render() {
    const userInfo = this.props.userInfo;
    return (
      <View className='user-info'>
        {!userInfo.loginname ? (
          <Link className='login-no' to={{ url: '/login' }}>
            <View className='login'>
              <View>登录</View>
            </View>
          </Link>
        ) : (
          <Link
            className='login-yes'
            to={{ url: '/user', params: { loginname: userInfo.loginname } }}>
            <View className='avertar'>
              {userInfo.avatar_url ? (
                <Image className='avertar' src={userInfo.avatar_url} />
              ) : (
                ''
              )}
            </View>
            <View className='info'>
              {userInfo.loginname ? <Text>{userInfo.loginname}</Text> : ''}
            </View>
          </Link>
        )}
      </View>
    );
  }
}

export default connect(
  ({ auth }) => ({
    userInfo: auth,
  }),
  (dispatch: Function) => ({
    authCheckState() {
      dispatch(actions.authCheckState());
    },
  }),
)(UserInfo);
