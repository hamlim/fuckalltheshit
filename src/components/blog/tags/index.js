import React, {Component} from 'react';
import 'whatwg-fetch';

import Anchor from '../../anchor';
import Header from '../../header/header';
import Subnav from '../subnav';
import TagApp from './tagapp';

import styles from './tags.css';

const Link = ({to, children}) => (
  <Anchor to={to} className={styles.link}>{children}</Anchor>
);

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: []
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch('/assets/json/posts.json').then(r => {
      return r.json();
    }).then(feed => {
      console.log(feed);
      this.setState({feed});
    }).catch(err => console.warn(err));
  }

  render() {
    let feedLengthBool = this.state.feed.length > 0;
    return (
      <section className="Tags">
        <Header page="Tags" />
        <Subnav variation="Tags"/>
        <div className={styles.wrapper}>
          <h2>Tags:</h2>
          {feedLengthBool ? (
            <TagApp feed={this.state.feed} />
          ) : (
            <div className={styles.loading}></div>
          )}
        </div>
      </section>
    )
  }
};

export default Tags;
