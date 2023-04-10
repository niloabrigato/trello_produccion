const ItemIssue = ({ label, colorTexto, children }) => {
  return (
    <>
      <p className={colorTexto}>
        <span className="font-semibold">{label} : </span>
        <span>{children}</span>
      </p>
    </>
  )
}

export default ItemIssue
