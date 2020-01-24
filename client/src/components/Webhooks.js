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
      {webhooks.map(webhook => {
        return <tr>
          <td>{ webhook.id }</td>
          <td>{ webhook.repo }</td>
          <td>{ webhook.created_at }</td>
        </tr>
      })}
      </tbody>
    </table>
  </div>
}

