const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Sup');
})

//

app.listen(3030, () => {
    console.log('Serving on port 3030')
});