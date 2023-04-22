const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('Server Running Successfully')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id',(req, res)=>{
  const id = Number(req.params.id)
  const noteToSend = notes.find(note => note.id === id)
  if(noteToSend){
    res.json(noteToSend)
  }
  else{
    // res.statusMessage = 'Invalid Resource ID'
    res.status(404).end()
  }
})

app.delete('/api/notes/:id',(req, res)=> {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})


const getMaxId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
  return maxId + 1
}


app.post('/api/notes', (req, res)=>{
  const body = req.body

  if(!body.content ){
    return res.status(400).json({
      error:"Content can not be empty"
    })
  }

  const noteToBeAdded = {
    id:getMaxId(),
    content:body.content,
    important:Boolean(body.important) || false
  }

  notes = notes.concat(noteToBeAdded)
  res.status(200).json(noteToBeAdded).end()
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Updated App Running At Port : ${PORT}`)
})