import { Component } from 'react';
import { View } from '@ui';
import Head from 'next/head';

export default class Layout extends Component<{
  className?: string;
  title?: string;
}> {
  render() {
    const { children, className, title } = this.props;
    const clsName = className || 'flex-wrp';

    const staticMarkup = `!function(x){function w() { var v, u, t, tes, s = x.document, r = s.documentElement, a = r.getBoundingClientRect().width; if (!v && !u) { var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/); v = x.devicePixelRatio; tes = x.devicePixelRatio; v = n ? v : 1, u = 1 / v } if (a >= 640) { r.style.fontSize = "40px" } else { if (a <= 320) { r.style.fontSize = "20px" } else { r.style.fontSize = a / 320 * 20 + "px" } } }x.addEventListener("resize",function(){w()});w()}(window);`;

    return (
      <View className={clsName}>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          {title ? <title>{title}</title> : ''}
          <link rel='icon' href={`${process.env.STATIC_URL}/favicon.ico`} />
          <script dangerouslySetInnerHTML={{ __html: staticMarkup }}></script>
        </Head>
        {children}
      </View>
    );
  }
}
