class MachineLoad
{
    constructor(fileDataDB, fileConfig)
    {
        this.dataDB = JSON.parse(fileDataDB);
        this.config = JSON.parse(fileConfig);
        this.dateTimeNow = new Date();
        this.InterfaceCore = new InterfaceCore(this.config);
        
    }

    timeStampRemainigProduction(machine,sequence)
    {
        let orderQuantity = parseInt(this.dataDB.queue[machine].queueProducts[sequence].orderQuantity);
        let quantityProduced = parseInt(this.dataDB.queue[machine].queueProducts[sequence].quantityProduced);
        let bpm = this.verifyBpm(machine, sequence);
        let balanceProduced = orderQuantity - quantityProduced;
        let minutesRemainig = parseInt(balanceProduced / bpm);
        let lunchBreak = this.verifyLanchBreak();
        
        //converte os minutos para inteiro de timestamp
        return (minutesRemainig + lunchBreak) * 60 * 1000;
        
    }

    getPrevision(machine)
    {
        //seta o horario atual para o primeiro item da simulação
        this.setPrevisionFirstItem(machine);
        
        //pega a quantidade de objetos dentro do objeto
        //a forma é diferente do array

        var numbersQueueProducts = Object.keys(this.dataDB.queue[machine].queueProducts).length;
        var queueKey = 0;

        for(let i = 1; i < numbersQueueProducts; i++)
        {
            var dataTimePrevisionPrevious = new Date(this.dataDB.queue[machine].queueProducts[queueKey].previsionEnd);
            
            this.dataDB.queue[machine].queueProducts[i].previsionStart = dataTimePrevisionPrevious;

            var newPrevision = this.setPrevisions(machine,i, dataTimePrevisionPrevious);

            this.dataDB.queue[machine].queueProducts[i].previsionEnd = newPrevision;

            queueKey++;

        }

       return this.dataDB;
    }

    setPrevisions(machine, queueKey, dateTimeNow)
    {
        var timeRemainingProduction = this.timeStampRemainigProduction(machine, queueKey);
        var dateTimeNowSimulation = this.getDateTimeNowSimulation(dateTimeNow);
        var newDateTimePrevision = new Date(dateTimeNowSimulation.getTime()+timeRemainingProduction);
        
        return this.InterfaceCore.getNewPrevision(newDateTimePrevision);
    }
    setPrevisionFirstItem(machine)
    {
        var dateTimeNowSimulation = this.getDateTimeNowSimulation()
        
        this.dataDB.queue[machine].queueProducts[0].previsionEnd = this.setPrevisions(machine, 0, dateTimeNowSimulation);
        
    }

    getDateTimeNowSimulation(dateTimeNow = null)
    {
        if(dateTimeNow == null){
            return new Date(this.InterfaceCore.getNewPrevision(this.dateTimeNow));
        }
           
        return new Date(this.InterfaceCore.getNewPrevision(dateTimeNow));

    }

    verifyLanchBreak()
    {
        if(this.config.lunchBreak.considerLunchBreak)
        {
            return parseInt(this.config.lunchBreak.inTtimeMinutesLunch);
        }
            return 0;
        
    }
    
    verifyBpm(machine, sequence)
    {
        if(this.dataDB.queue[machine].considerBPMMachine)
        {
            var bpm = this.dataDB.queue[machine].bpm;

        }else{

            var bpm = this.dataDB.queue[machine].queueProducts[sequence].bpmProduct;
    
        }
        
        return bpm;
    }
}


module.exports = MachineLoad;
