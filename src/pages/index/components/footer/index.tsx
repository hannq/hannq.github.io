import React from 'react';
import { Link, graphql } from 'gatsby';
import Img, { FluidObject } from "gatsby-image";
import styles from './index.module.less';

interface IProps { }

const Footer: React.SFC<IProps> = (props) => {
  return (
    <footer className={styles.footer}>
      <span>Copyright&nbsp;</span>
      <a href="https://hannq.github.io">&copy;NianQi Han&nbsp;</a>
      <span>的技术博客&nbsp;{new Date().getFullYear()}</span>
    </footer>
  )
}

export default Footer
