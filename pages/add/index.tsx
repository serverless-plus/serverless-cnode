import React, { Component } from 'react';
import { withUser } from '@hoc/router';
import { View } from '@ui';
import Header from '@components/header';
import * as utils from '@libs/utils';
import classNames from 'classnames';
import { post } from '@utils/request';
import Head from 'next/head';
import Layout from '@components/layout';
import { IAuth } from '@interfaces/auth';

type PageStateProps = {
  userInfo: IAuth;
  state: PageState;
};

type PageDispatchProps = {
  authCheckState: () => void;
};

type PageOwnProps = {};
interface PageState {
  topic?: any;
  err: string;
  authorTxt: string;
  selectorIndex: number;
  selector: any[];
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

class Add extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  static getInitialProps() {
    return {
      state: {
        topic: {
          tab: 'share',
          title: '',
          content: '',
        },
        selectorIndex: 0,
        selector: [
          {
            name: '分享',
            value: 'share',
          },
          {
            name: '问答',
            value: 'ask',
          },
          {
            name: '招聘',
            value: 'job',
          },
        ],
        err: '',
        authorTxt:
          '\n\n 来自拉风的 [nextjs-cnode](https://github.com/icai/nextjs-cnode)',
      },
    };
  }

  addTopic() {
    let title = utils.trim(this.state.topic.title);
    let contents = utils.trim(this.state.topic.content);
    if (!title || title.length < 10) {
      this.setState({
        err: 'title',
      });
      return false;
    }
    if (!contents) {
      this.setState({
        err: 'content',
      });
      return false;
    }
    let postData = {
      ...this.state.topic,
      content: this.state.topic.content + this.state.authorTxt,
      accesstoken: this.props.userInfo.token,
    };

    post({
      data: postData,
      url: 'https://cnodejs.org/api/v1/topics',
    })
      .then((resp) => {
        let res = resp.data;
        if (res.success) {
          utils.navigateTo({ url: '/' });
        } else {
          utils.showToast({ title: res.error_msg });
        }
      })
      .catch((resp) => {
        console.info(resp);
      });
  }
  handleTopicTabChange = (e) => {
    this.setState((prevState) => ({
      topic: {
        ...prevState.topic,
        tab: prevState.selector[e.detail.value]['value'],
      },
      selectorIndex: e.detail.value,
    }));
  };
  handleTopicContentChange = (e) => {
    this.setState((prevState) => ({
      topic: {
        ...prevState.topic,
        content: e.target.value,
      },
    }));
  };
  handleTopicChange = (e) => {
    this.setState((prevState) => ({
      topic: {
        ...prevState.topic,
        title: e,
      },
    }));
  };
  render() {
    const { err } = this.state || this.props.state;
    return (
      <Layout>
        <Head>
          <title>发表</title>
        </Head>
        <Header pageType={'主题'} fixHead={true} showMenu={true} />
        <View className='add-container'>
          <View className='line'>
            选择分类：
            <select
              className='add-tab'
              value={this.state.topic.tab}
              onChange={this.handleTopicTabChange}>
              <option value='share'>分享</option>
              <option value='ask'>问答</option>
              <option value='job'>招聘</option>
            </select>
            <View className='add-btn' onClick={this.addTopic.bind(this)}>
              发布
            </View>
          </View>
          <View className='line'>
            <input
              className={classNames({
                'add-title': 1,
                err: err == 'title',
              })}
              value={this.state.topic.title}
              onChange={this.handleTopicChange}
              type='text'
              placeholder='标题，字数10字以上'
              max-length='100'
            />
          </View>
          <textarea
            className={classNames({
              'add-content': 1,
              err: err == 'content',
            })}
            value={this.state.topic.content}
            onChange={this.handleTopicContentChange}
            maxLength={9999}
            style={{ height: '400px' }}
            placeholder='回复支持Markdown语法,请注意标记代码'
          />
        </View>
      </Layout>
    );
  }
}

export default withUser(Add);
