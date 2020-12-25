import { Link } from 'react-router-dom';

export default function Error () {
  return (
    <div style={{marginTop: "10rem", textAlign: "center"}}>
      <h1>404 not Found</h1>
      <p>お探しのページは見つかりませんでした。</p>
      <Link to="/" style={{color: "royalblue"}}>トップページへ</Link>
    </div>
  )
}