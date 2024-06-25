import s from './index.module.scss'

const EngagementCard = ({logo, value, title}) => {
  return (
    <div className={s.EngagementCard}>
    {logo}
      <div>
        <h4>{value}</h4>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default EngagementCard