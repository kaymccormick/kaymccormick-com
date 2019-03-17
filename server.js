#!/usr/bin/node

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const fs = require('fs')

app.prepare().then(() => {
  const server = express()

    server.get('*', (req, res) => {
	req.createReadStream = fs.createReadStream;
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
