import React from 'react'

const TaskList = React.lazy(() => import('./views/tasklist/TaskList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/tasklist', name: 'TaskList', element: TaskList },
]

export default routes
