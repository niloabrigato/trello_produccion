import { useState } from 'react'
import Error from './Error'

const NewIssue = ({ setRefresh }) => {
  const [error, setError] = useState(false)
  const [issue, setIssue] = useState({
    title: '',
    description: '',
    asignated: '',
    priority: 'BAJA',
    blocked: null,
    todoDate: new Date().toLocaleDateString('es-es', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    inProgressDate: null,
    doneDate: null,
    state: 'PENDIENTE',
  })

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      [issue.title, issue.asignated, issue.asignated, issue.priority].includes(
        '',
      )
    ) {
      setError(true)
      return
    }

    setError(false)

    let issueNew = structuredClone(issue)
    issueNew.id = crypto.randomUUID()
    const url = 'http://localhost:8000/issues'
    const data = {
      id: issueNew.id,
      title: issueNew.title,
      description: issueNew.description,
      asignated: issueNew.asignated,
      priority: issueNew.priority,
      blocked: issueNew.blocked,
      todoDate: issueNew.todoDate,
      inProgressDate: issueNew.inProgressDate,
      doneDate: issueNew.doneDate,
      state: issueNew.state,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))

    /** Reseteo  */
    setIssue({
      title: '',
      description: '',
      asignated: '',
      priority: 'BAJA',
      blocked: null,
      todoDate: new Date().toLocaleDateString('es-es', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      inProgressDate: null,
      doneDate: null,
      state: 'PENDIENTE',
    })

    /** refresco kanbam */
    setRefresh(true)
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="border-spacing-1 rounded-lg bg-slate-400 p-3"
    >
      {error && <Error>Los campos son obligatorios, excepto Bloqueo</Error>}
      <div>
        <label htmlFor="title" className="block font-semibold">
          Titulo:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Título de la tarea"
          value={issue.title}
          onChange={(e) => handleChange(e)}
          className="block w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block font-semibold">
          Detalle:
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Detalle de la tarea"
          value={issue.description}
          onChange={(e) => handleChange(e)}
          className="block w-full"
        />
      </div>

      <div>
        <label htmlFor="asignated" className="block font-semibold">
          Responsable:
        </label>
        <input
          type="text"
          name="asignated"
          id="asignated"
          placeholder="Responsable de la tarea"
          value={issue.asignated}
          onChange={(e) => handleChange(e)}
          className="block w-full"
        />
      </div>
      <div>
        <label htmlFor="priority" className="block font-semibold">
          Prioridad:
        </label>
        <input
          type="text"
          name="priority"
          id="priority"
          placeholder="Prioridad de la tarea"
          value={issue.priority}
          onChange={(e) => handleChange(e)}
          className="block w-full"
        />
      </div>
      <div>
        <label htmlFor="blocked" className="block font-semibold">
          Bloqueo:
        </label>
        <textarea
          name="blocked"
          id="blocked"
          placeholder="Describa si hay bloqueo"
          value={issue.blocked}
          onChange={(e) => handleChange(e)}
          className="block w-full"
        />
      </div>
      <button
        type="submit"
        className="block bg-green-500 rounded-lg uppercase mt-2 text-white w-full"
      >
        Crear tarea
      </button>
    </form>
  )
}

export default NewIssue
