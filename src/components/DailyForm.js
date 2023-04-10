import { useState } from 'react'

const DailyForm = ({ dailies, setDailies }) => {
  const [daily, setDaily] = useState({
    fecha: '',
    ayer: '',
    hoy: '',
  })

  const handleChange = (e) => {
    setDaily({
      ...daily,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newDaily = structuredClone(daily)
    newDaily.id = crypto.randomUUID()

    setDailies([...dailies, newDaily])
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Daily New</h1>
      <div>
        <label htmlFor="ayer">Fecha</label>
        <input
          type="text"
          name="fecha"
          id="fecha"
          placeholder="Ingrese fecha"
          value={daily.fecha}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="ayer">Ayer</label>
        <textarea
          type="text"
          name="ayer"
          id="ayer"
          placeholder="Que hice ayer"
          value={daily.ayer}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="hoy">Hoy</label>
        <textarea
          type="text"
          name="hoy"
          id="hoy"
          placeholder="Que haré hoy"
          value={daily.hoy}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="bloqueo">Bloqueo</label>
        <textarea
          type="text"
          name="bloqueo"
          id="bloqueo"
          placeholder="Hay algún bloqueo"
          value={daily.bloqueo}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <button>Creaate Daily</button>
    </form>
  )
}

export default DailyForm
