import { FC } from 'react'

import error404 from './400.svg'
import s from './Error404.module.css'

export const Error404: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.picture}>
        <img src={error404} alt="error404" />
      </div>
      <div className={s.title}>Ooops, page not found!</div>
      <div className={s.text}> Sorry, but the requested page is not found.</div>
    </div>
  )
}
