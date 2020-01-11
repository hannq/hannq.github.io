import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../../components/seo';
import Img, { FluidObject } from "gatsby-image";
// import '@primer/css/core/index.scss';
import styles from './index.module.less';

interface IAllMarkdownRemark {
  edges: {
    node: {
      id: string;
      /** markdown 文件的 frontmatter 配置信息 */
      frontmatter: {
        /** 标题 */
        title: string;
        /** 页面路径 */
        path: string;
        /** 发布时间 */
        date: string;
        /** 封面信息 */
        cover: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  }[]
}

interface IQueryData {
  /** 所有的 markdown 信息 */
  allMarkdownRemark: IAllMarkdownRemark;
}

interface IProps {
  /** 通过 graphql 注入的数据 */
  data: IQueryData;
}

const IndexPage: React.SFC<IProps> = (props) => {
  const { data } = props;
  console.log('styles ==>', styles)
  return (
    <>
      <SEO title="Home" />
      {data.allMarkdownRemark.edges.map(edge => (
        <Link className={styles.blogItem} to={edge.node.frontmatter.path} key={edge.node.id}>
          <p>{edge.node.frontmatter.title}</p>
          <p>{edge.node.frontmatter.date}</p>
          <Img className={styles.blogCover} fluid={edge.node.frontmatter.cover.childImageSharp.fluid} alt="A corgi smiling happily"/>
        </Link>
      ))}
    </>
  )
}

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
            cover {
              childImageSharp {
                fluid {
                  sizes
                  src
                  srcSet
                  aspectRatio
                  base64
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
