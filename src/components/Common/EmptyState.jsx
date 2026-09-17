
const EmptyState = ({title = "Nothing here yet", text=""}) => {
  return (
    <div className="empty-state">
        <h3>{title}</h3>
        {text && <p> {text}</p>}
    </div>
  )
}

export default EmptyState