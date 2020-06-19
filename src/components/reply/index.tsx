import React, { Component } from 'react';
import { View } from '@ui';
import * as utils from '@libs/utils';
import { withUser } from '@hoc/router';
import classNames from 'classnames';
import update from 'immutability-helper';
import { post } from '@utils/request';
import './index.scss';

const markdown = require('markdown').markdown;

interface updateRepliesFunc {
  (func: any): any;
}

type Iprops = {
  userInfo;
  topic;
  topicId;
  replyId;
  replyTo?;
  show;
  updateReplies: updateRepliesFunc;
  onClose: () => void;
};

type PageState = {
  hasErr;
  content;
  author_txt;
};

// props: ['topic', 'replyId', 'topicId', 'replyTo', 'show'],
class Reply extends Component<Iprops, PageState> {
  state = {
    hasErr: false,
    content: '',
    author_txt:
      '\n\n 来自拉风的 [React-cnode](https://github.com/icai/taro-cnode)',
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  componentDidMount() {
    if (this.props.replyTo) {
      this.setState({
        content: `@${this.props.replyTo}`,
      });
    }
  }
  addReply() {
    const { content, author_txt } = this.state;
    const { userInfo, topicId, replyId, show, updateReplies } = this.props;
    if (!content) {
      this.setState({ hasErr: true });
    } else {
      let time = new Date();
      let linkUsers = utils.linkUsers(content);
      let htmlText = markdown.toHTML(linkUsers) + author_txt;
      let replyContent = utils.getContentHtml(htmlText);
      let postData: any = {
        accesstoken: userInfo.token,
        content: content + author_txt,
      };
      if (replyId) {
        postData.reply_id = replyId;
      }

      post({
        data: postData,
        url: `https://cnodejs.org/api/v1/topic/${topicId}/replies`,
      })
        .then((resp) => {
          let res = resp.data;
          if (res.success) {
            updateReplies &&
              updateReplies((topic, context) => {
                const newreplies = update(topic.replies, {
                  $push: [
                    {
                      id: res.reply_id,
                      author: {
                        loginname: userInfo.loginname,
                        avatar_url: userInfo.avatar_url,
                      },
                      content: replyContent,
                      ups: [],
                      create_at: time,
                    },
                  ],
                });
                topic.replies = newreplies;
                context.setState({ topic: topic });
              });
            this.setState({ content: '' });
            if (show) {
              this.props.onClose();
            }
          } else {
            utils.showToast({ title: res.error_msg });
          }
        })
        .catch((resp) => {
          console.info(resp);
        });
    }
  }

  render() {
    const { hasErr } = this.state;
    return (
      <View className='reply'>
        <textarea
          id='content'
          className={classNames({
            text: 1,
            err: hasErr,
          })}
          value={this.state.content}
          onChange={this.handleChange}
          placeholder='回复支持Markdown语法,请注意标记代码'
          rows={8}></textarea>
        <View className='button' onClick={this.addReply.bind(this)}>
          确定
        </View>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 React.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default withUser(Reply); // as ComponentClass<PageOwnProps, PageState>;
