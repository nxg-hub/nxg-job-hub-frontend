import s from './index.module.scss'

const Notice = ({message, newClass, ...props}) => {
  return (
    <div className={!newClass ? s.Notice : s[newClass]}>Notice: {message}</div>
  )
}

export default Notice