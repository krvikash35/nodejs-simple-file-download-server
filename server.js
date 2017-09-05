const http = require('http');
const fs = require('fs');
const path = require('path');

const requestHandler = function(req, res){
  console.log('got request', req.url);
  console.log(req.url.split('/'))
  const filename = path.join(__dirname, 'download', req.url.split('/')[1]);
  console.log('filename is ', filename);
  try {
    const file = fs.readFileSync(filename);
    res.writeHead(200, {'Content-type': 'application/octet-stream'});
    res.write(file);
    res.end();
    console.log('sent success')
  } catch (error) {
    console.log(error);
    res.writeHead(404, {'Content-type': 'application/json'});
    res.write(error.toString());
    res.end();
  }
}

const server = http.createServer(requestHandler);
const port = process.argv[2] || 3000;

server.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})

