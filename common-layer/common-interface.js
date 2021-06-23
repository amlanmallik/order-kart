const serverConfigInst = require('./server-config');

class CommonInterfaceCls {
    constructor() {
        this.serverConfig = serverConfigInst;
    }
}

const CI = new CommonInterfaceCls();
module.exports = CI