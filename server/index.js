const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const buildPath = path.join(__dirname, '..', 'build');
const apis = require('./routes');
app.use(express.static(buildPath));
app.use('/apis', apis);
app.get('*', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 4001;

app.listen(port, () => {
	console.log(`website is working on port: ${port}`);
});
