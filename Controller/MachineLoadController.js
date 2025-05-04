module.exports = {
    index: function(req, res){
        res.render('views/machine-load/index')
    },
    prevision: function(req, res){
        const MachineLoad = require('../Libs/machineLoad/MachineLoad');
        const configWork = require('../Models/configWork');
        const dataDB = require('../Models/dataDB');
        var prevision = new MachineLoad(configWork, dataDB).getPrevision();
       
        res.render('views/machine-load/prevision/index', {"prevision":prevision});
    }
}