import React, { useEffect, useState } from 'react'

export default () => {
  const [webhooks, setWebhooks] = useState([])

  const fetchWebhooks = async () => {
    const response = await fetch('/api/webhooks')
    const data = await response.json()
    setWebhooks(data)
  }

  useEffect(() => {
    fetchWebhooks()
  }, [])

  if (webhooks.length === 0) {
    return <div>No Webhooks found</div>
  }

  return <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Repo</th>
        <th>Created At</th>
      </tr>
      </thead>
      <tbody>
      {webhooks.map(({ key, repo, created_at }) => {
        return <tr key={key.id}>
          <td>{ key.id }</td>
          <td>{ repo }</td>
          <td>{ created_at }</td>
        </tr>
      })}
      </tbody>
    </table>
  </div>
}

