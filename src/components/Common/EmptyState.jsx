
const EmptyState = ({title = "Nothing here yet", text="",children}) => {
  return (
    <div className="empty-state">
        <h3>{title}</h3>
        {text && <p> {text}</p>}
        {children}
    </div>
  )
}

export default EmptyState