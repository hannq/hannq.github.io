import React from 'react';
import { Link, graphql } from 'gatsby';
import styles from './index.module.less';

interface IProps {

}

const Footer: React.SFC<IProps> = (props) => {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/">
          <span className={styles.author}>NianQI Han's</span>
          <span className={styles.blog}>Blog</span>
        </Link>
      </header>
    </section>
  )
}

export default Footer
