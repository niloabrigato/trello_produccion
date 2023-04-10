import { useState } from 'react'
import ItemIssue from './ItemIssue'

const Issue = ({ issue, setRefresh }) => {
  const [flag, setFlag] = useState(false)
  const [message, setMessage] = useState(null)

  const {
    id,
    title,
    description,
    asignated,
    priority,
    blocked,
    todoDate,
    inProgressDate,
    doneDate,
    state,
  } = issue

  const handleToogle = () => {
    if (flag) setFlag(false)
    else setFlag(true)
  }

  const handleMouseOver = (text) => {
    setMessage(text)
  }

  const handleState = (state) => {
    const url = `http://localhost:8000/issues/${id}`
    let fechaTodo = todoDate
    let fechaInProgress = inProgressDate
    let fechaDone = doneDate

    switch (state) {
      case 'PENDIENTE':
        {
          ;(fechaTodo = new Date().toLocaleDateString('es-es', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })),
            (fechaInProgress = null)
          fechaDone = null
        }
        break
      case 'EN PROGRESO':
        {
          ;(fechaInProgress = new Date().toLocaleDateString('es-es', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })),
            (fechaDone = null)
        }
        break
      case 'TERMINADO':
        {
          fechaDone = new Date().toLocaleDateString('es-es', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        }
        break

      default:
        break
    }

    const data = {
      id,
      title,
      description,
      asignated,
      priority,
      blocked,
      todoDate: fechaTodo,
      inProgressDate: fechaInProgress,
      doneDate: fechaDone,
      state: state,
    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))

    /** refresh kanban */
    setRefresh(true)
  }

  const handleDelete = () => {
    const eliminar = confirm(
      `¿Está seguro de que desea eliminar la tarea ${title}?`,
    )

    if (eliminar) {
      const url = `http://localhost:8000/issues/${id}`
      const options = {
        method: 'DELETE',
      }

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error))
    }

    /** refresh kanban */
    setRefresh(true)
  }

  return (
    <div className="bg-slate-900 p-2 m-2 rounded-md text-white w-full">
      <h1 className="text-xl text-center uppercase">{title}</h1>
      {flag && (
        <div>
          <ItemIssue label="Id">{id}</ItemIssue>
          <ItemIssue label="Detalle">{description}</ItemIssue>
          <ItemIssue label="Responsable">{asignated}</ItemIssue>
          <ItemIssue label="Prioridad">{priority}</ItemIssue>
        </div>
      )}

      <ItemIssue label="Pendiente" colorTexto="text-blue-500">
        {todoDate}
      </ItemIssue>
      {inProgressDate && (
        <ItemIssue label="En progreso" colorTexto="text-yellow-500">
          {inProgressDate}
        </ItemIssue>
      )}
      {doneDate && (
        <ItemIssue label="Terminado" colorTexto="text-green-500">
          {doneDate}
        </ItemIssue>
      )}
      {blocked && (
        <ItemIssue label="Bloqueado" colorTexto="text-red-500">
          {blocked}
        </ItemIssue>
      )}

      <ItemIssue label="Estado">{state}</ItemIssue>
      <ItemIssue label={null}>{message}</ItemIssue>

      <div className="flex flex-1 justify-around">
        <button
          onClick={handleToogle}
          className="rounded-md p-2"
          onMouseOver={() => handleMouseOver('mostrar/ocultar detalles')}
          onMouseLeave={() => handleMouseOver(null)}
        >
          {flag ? '➖' : '➕'}
        </button>
        {state !== 'PENDIENTE' && (
          <button
            className="bg-blue-500 rounded-md p-2"
            onMouseOver={() => handleMouseOver('Cambiar a pendiente')}
            onMouseLeave={() => handleMouseOver(null)}
            onClick={() => handleState('PENDIENTE')}
          >
            ⏳
          </button>
        )}
        {state !== 'EN PROGRESO' && (
          <button
            className="bg-yellow-500 rounded-md p-2"
            onMouseOver={() => handleMouseOver('Cambiar a en progreso')}
            onMouseLeave={() => handleMouseOver(null)}
            onClick={() => handleState('EN PROGRESO')}
          >
            🚀
          </button>
        )}
        {!state.includes('PENDIENTE', 'TERMINADO') && (
          <button
            className="bg-green-500 rounded-md p-2"
            onMouseOver={() => handleMouseOver('Cambiar a completada')}
            onMouseLeave={() => handleMouseOver(null)}
            onClick={() => handleState('TERMINADO')}
          >
            ✔
          </button>
        )}
        <button
          className="rounded-md p-2"
          onMouseOver={() => handleMouseOver('Editar')}
          onMouseLeave={() => handleMouseOver(null)}
        >
          🖊
        </button>
        <button
          className="rounded-md p-2"
          onMouseOver={() => handleMouseOver('Comentar')}
          onMouseLeave={() => handleMouseOver(null)}
        >
          🗨
        </button>
        <button
          className="rounded-md p-2"
          onMouseOver={() => handleMouseOver('Eliminar')}
          onMouseLeave={() => handleMouseOver(null)}
          onClick={handleDelete}
        >
          ❌
        </button>
      </div>
      {/* {message} */}
    </div>
  )
}

export default Issue
