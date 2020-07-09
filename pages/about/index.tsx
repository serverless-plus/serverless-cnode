// import { ComponentClass } from 'react'
import React, { Component } from 'react';
import { ScrollView } from '@ui';
import Header from '@components/header';
import Layout from '@components/layout';

class About extends Component {
  render() {
    return (
      <Layout className='flex-wrp'>
        <Header pageType={'关于'} fixHead={true} needAdd={true}></Header>
        <ScrollView className='about-info' style={{ height: '100vh' }}>
          <dt>关于项目</dt>
          <dd>
            使用 Next.js + TypeScript 开发，并且基于 Serverless 部署的 cnode
            客户端
          </dd>
          <dt>源码地址</dt>
          <dd>
            <a href='https://github.com/serverless-plus/serverless-cnode'>
              https://github.com/serverless-plus/serverless-cnode
            </a>
          </dd>
          <dt>意见反馈</dt>
          <dd>
            <a href='https://github.com/serverless-plus/serverless-cnode/issues'>
              发表意见或者提需求
            </a>
          </dd>
          <dt>当前版本</dt>
          <dd>V0.0.1</dd>
        </ScrollView>
      </Layout>
    );
  }
}

export default About;
