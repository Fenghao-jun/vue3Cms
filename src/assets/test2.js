//Express server on port 3000
const express = require('express')
const app = express()
const port = 3000
// Return the current time
app.get('/', (req, res) => res.send(new Date().toString()))
// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// End of file
// Language: javascript
