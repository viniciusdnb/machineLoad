class MachineLoad{
    constructor(configWork, dataDB){
        
        this.configWork = configWork;
        this.dataDB = dataDB;
    }

    timeRemainingProduction(queueKey)
    {
        let orderQuantity = parseInt(this.dataDB.fila[queueKey].quantidadePedido);
        let quantityProduced = parseInt(this.dataDB.fila[queueKey].quantidadeProduzido);
        let bpm = this.dataDB.fila[queueKey].bpm;
        let balanceProduced = orderQuantity - quantityProduced;
        let minutesRemainig = parseInt(balanceProduced / bpm);
        var lunch = 0;
        if(this.configWork.lunch){
            minutesRemainig += 60;
            lunch = 60;
        }
        //verifica se a quantidade de tempo e maior que as 10 horas de trabalho
        if (minutesRemainig > 600){
            var realtime = minutesRemainig + ((minutesRemainig / 600)*600+lunch);
        }else{
            var realtime = minutesRemainig;
        }

        
        return realtime *60 *1000 ;
    }

    getPrevision(){
        const Core = require('./Core');
        var key = 0;//chave do primeiro item
        var dataAtual = new Date();
        switch (dataAtual.getDay()) {
            case 0:
                dataAtual.setDate(dataAtual.getDate()+1)
                dataAtual.setHours(4);
                dataAtual.setMinutes(0);
                break;
            case 6:
                dataAtual.setDate(dataAtual.getDate()+2)
                dataAtual.setHours(0);
                dataAtual.setMinutes(4);
                break;
            
        }
        this.dataDB.fila[key].dataHoraAtual = dataAtual;
        var dateTimeNow = new Date(this.dataDB.fila[key].dataHoraAtual);
        var newTimeRemaing = new Date(new Date(dateTimeNow).getTime() + this.timeRemainingProduction(0));
        this.dataDB.fila[key].previsaoFinalProducao = new Core(this.configWork, newTimeRemaing).nextDate().newPrevision;
        
        
     
        for(let i = 1; i < this.dataDB.fila.length; i++){
            var dataTimePrevious = new Date(this.dataDB.fila[key].previsaoFinalProducao);
            var newTimeRemaing = new Date(new Date(dataTimePrevious).getTime() + this.timeRemainingProduction(i));
            this.dataDB.fila[i].previsaodataHoraInicioProducao = this.dataDB.fila[key].previsaoFinalProducao;
            
            var newPrevision = new Date(new Core(this.configWork, newTimeRemaing).nextDate().newPrevision);
           
           
            //verifica se o dia anterior é final de semana se for acresenta mais horas na previsao

            var sunday = new Date(newPrevision.setDate(newPrevision.getDate()-1));
            if(sunday.getDay()==0){
                newTimeRemaing = new Date(new Date(dataTimePrevious).getTime() + this.timeRemainingProduction(i)+(3000*60*1000));
            }


            this.dataDB.fila[i].previsaoFinalProducao = new Core(this.configWork, newTimeRemaing).nextDate().newPrevision;
            
            key++;
         
        }
       

       return {"newPrevisions": this.dataDB.fila}

        
     
    }
}

module.exports = MachineLoad;
/*
const Core = require("./Core")
const configWork  = require("./configWork");
const dataDB = require("./dataDB");

var test = new MachineLoad(configWork, dataDB);

console.log(test.setPrevision());*/

/*var test = new Core(configWork,new Date("2025-05-05T12:00:00"))

console.log(test.nextDate());*/
