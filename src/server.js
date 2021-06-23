const express = require('express');
const app = express();
module.exports = ({ router, config: { port } }) => {
    app.use('/api', router);
    const start = () => {
        const promObj = new Promise((resolve, reject) => {
            const server = app.listen(port, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(`Listening on port ::: ${port}`);
                    resolve(server);
                }
            })
        })
        return promObj;
    }
    return { app, start }
}