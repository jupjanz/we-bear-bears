import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'

import { /* getAllPostIds, */ getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
  // const paths = [
  //   { params: { id: 'pre-rendering' } },
  //   { params: { id: 'ssg-ssr' } },
  //   { params: { id: 'ssg-ssr1' } },
  //   { params: { id: 'ssg-ssr2' } }
  // ]
  // const paths = getAllPostIds()
  const paths = [
    { params: { id: 'pre-rendering' } },
    { params: { id: 'ssg-ssr' } },
    { params: { id: 'ssg-ssr1' } },
    { params: { id: 'ssg-ssr2' } }
  ]
  console.log( paths);

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  console.log('params', params);
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    },
    revalidate: 1,
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      {/* <br />
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
    </Layout>
  )
}