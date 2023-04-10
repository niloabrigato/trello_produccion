const Error = ({ children }) => {
  return (
    <div className="bg-red-800 text-white p-3 mb-3 font-bold uppercase rounded-md">
      <p>{children}</p>
    </div>
  )
}

export default Error
