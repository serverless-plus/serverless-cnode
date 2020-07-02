// import { ComponentClass } from 'react'
import React, { Component } from 'react';

import { View } from '@ui';
import { TopicsList } from '@components/topics';
import Header from '@components/header';
import { throttle } from 'throttle-debounce';
import { ITopic } from '@interfaces/topic';
// import BackTop from "@components/backtotop";
// import update from "immutability-helper";
import { get } from '@utils/request';
import Loading from '@components/loading2';

// import Link from "next/link";
import { withRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@components/layout';

// type IProps =  {};
interface IProps {
  state: IState;
  router: {
    query: any;
  };
}

type TsearchKey = {
  page: number;
  limit: number;
  tab: string;
  mdrender: boolean;
};

interface IState {
  scroll: boolean;
  loading: boolean;
  topics: ITopic[];
  searchKey: TsearchKey;
}

class List extends Component<IProps, IState> {
  componentScrollBox;
  throttledScrollHandler;

  constructor(props) {
    super(props);
    this.state = props.state;
  }
  static getInitialProps({ query: { tab } }) {
    return {
      state: {
        scroll: true,
        topics: [],
        index: {},
        loading: true,
        searchDataStr: '',
        searchKey: {
          page: 1,
          limit: 20,
          tab: tab,
          mdrender: true,
        },
      },
    };
  }

  index = {};

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler);
  }
  componentDidMount() {
    this.componentScrollBox = document.documentElement;
    this.throttledScrollHandler = throttle(300, this.getScrollData);
    const { router } = this.props;
    if (router.query && this.props.router.query.tab) {
      this.setState(
        (prevState) => {
          searchKey: Object.assign(prevState.searchKey, {
            tab: this.props.router.query.tab,
          });
        },
        () => {
          this.getTopics();
        },
      );
    } else {
      this.getTopics();
    }

    window.addEventListener('scroll', this.throttledScrollHandler);
  }
  getScrollData = () => {
    if (this.state.scroll) {
      let totalheight =
        document.documentElement.clientHeight +
        document.documentElement.scrollTop;
      if (document.documentElement.scrollHeight <= totalheight + 200) {
        this.onReachBottom();
      }
    }
  };
  getTitleStr(tab) {
    let str = '';
    switch (tab) {
      case 'share':
        str = '分享';
        break;
      case 'ask':
        str = '问答';
        break;
      case 'job':
        str = '招聘';
        break;
      case 'good':
        str = '精华';
        break;
      default:
        str = '全部';
        break;
    }
    return str;
  }

  getTopics() {
    let params = this.state.searchKey;
    try {
      get({
        url: 'https://cnodejs.org/api/v1/topics',
        data: params,
      }).then((res) => {
        let data = res.data;
        this.setState({
          scroll: true,
          loading: false,
        });
        if (data && data.data) {
          this.mergeTopics(data.data);
        }
      });
    } catch (error) {
      // utils.showToast({
      //     title: "载入远程数据错误"
      // });
    }
  }
  mergeTopics = (topics) => {
    this.setState({ topics: [...this.state.topics, ...topics] });
  };
  onReachBottom = () => {
    if (this.state.scroll) {
      this.setState(
        (prevState) => ({
          scroll: false,
          loading: true,
          searchKey: {
            ...prevState.searchKey,
            page: prevState.searchKey.page + 1,
          },
        }),
        () => {
          this.getTopics();
        },
      );
    }
  };

  render() {
    const { searchKey, topics, loading } = this.state || this.props.state;
    return (
      <Layout>
        <Head>
          <title>首页</title>
        </Head>
        <Header
          pageType={this.getTitleStr(searchKey.tab)}
          fixHead={true}
          needAdd={true}
        />
        <View id='page'>
          <View className='posts-list'>
            <TopicsList topics={topics} />
          </View>
          {loading && searchKey.page > 1 && <Loading height='20vh' />}
        </View>
        {/* <BackTop /> */}
      </Layout>
    );
  }
}

export default withRouter(List);
