class ServerConfigCls {
    constructor() {
        this.setConfig();
    }
    setConfig() {
        this.port = 2200;
        this.corsOption = '*';
    }
}

const serverConfigInst = new ServerConfigCls();
module.exports = serverConfigInst;