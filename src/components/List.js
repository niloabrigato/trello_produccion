import { useEffect, useState } from 'react'

const List = ({ children, title }) => {
  const [clase, setClase] = useState('')

  const background2title = () => {
    switch (title) {
      case 'Pendientes':
        setClase('m-3 p-3 pr-7 bg-blue-500')
        break
      case 'En Progreso':
        setClase('m-3 p-3 pr-7 bg-yellow-500')
        break
      case 'Terminados':
        setClase('m-3 p-3 pr-7 bg-green-500')
        break
      default:
        break
    }
  }

  useEffect(() => {
    background2title()
  }, [])

  return (
    <>
      <div className={clase}>
        <h2 className="text-3xl">{title}</h2>
        {children}
      </div>
    </>
  )
}

export default List
