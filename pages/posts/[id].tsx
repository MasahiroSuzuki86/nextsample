import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

type PostProps = {
  id: string
}

const Post: NextPage<PostProps> = (props) => {
  const { id } = props
  const router = useRouter()

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p> このページは静的サイト生成によってビルド時に生成されたページです。
        </p>
        <p>{`/posts/${id}に対応するページです`}</p>
        </main>
    </div>
  )
}

//生成したいページのパスパラメータ組み合わせを返す
//このファイルは[id].tsxなので、パスパラメータとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: {
        id: '1'
      },
    },
    {
      params: {
        id: '2',
      },
    },
    {
      params: {
        id: '3',
      },
    },
  ]
  //fallbackをfalseにすると、pathsで定義されたページ以外は404
  return { paths, fallback: false }
}

//パラメータの型を定義
interface PostParams extends ParsedUrlQuery {
  id: string
}

//getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (isContext) => {
  return {
    props: {
      //paramsにgetStaticPathsで指定した値がそれぞれ入っている
      id: isContext.params!['id'],
    },
  }
}

export default Post
