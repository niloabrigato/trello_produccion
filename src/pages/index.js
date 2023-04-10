import { useEffect, useState } from 'react'

import Issue from '@/components/Issue'
import List from '@/components/List'
import NewIssue from '@/components/NewIssue'

export default function Home() {
  const [todolist, setTodolist] = useState([])
  const [inprogresslist, setinprogresslist] = useState([])
  const [donelist, setdonelist] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const issueUrl = 'http://localhost:8000/issues'
    fetch(issueUrl)
      .then((response) => {
        return response.json()
      })
      .then((issuesRecibed) => {
        setTodolist(
          issuesRecibed.filter((issue) => issue.state === 'PENDIENTE'),
        )
        setinprogresslist(
          issuesRecibed.filter((issue) => issue.state === 'EN PROGRESO'),
        )
        setdonelist(
          issuesRecibed.filter((issue) => issue.state === 'TERMINADO'),
        )
      })

    setRefresh(false)
  }, [refresh])

  return (
    <main>
      <h1 className="text-3xl text-center pb-3"> Mi Tablero de Tareas</h1>

      <div className="flex justify-around">
        <List title="Nueva Tarea">
          <NewIssue setRefresh={setRefresh} />
        </List>
        <List title="Pendientes">
          {todolist.map((issue) => (
            <Issue key={issue.id} issue={issue} setRefresh={setRefresh} />
          ))}
        </List>
        <List title="En Progreso">
          {inprogresslist.map((issue) => (
            <Issue key={issue.id} issue={issue} setRefresh={setRefresh} />
          ))}
        </List>
        <List title="Terminados">
          {donelist.map((issue) => (
            <Issue key={issue.id} issue={issue} setRefresh={setRefresh} />
          ))}
        </List>
      </div>
    </main>
  )
}
