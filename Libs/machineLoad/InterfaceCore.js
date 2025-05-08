const Core = require('./Core');


class InterfaceCore {
    constructor(config) {
        this.Core = new Core(config);
    }

    getNewPrevision(dateTime) {

        var newDateTimeAfterLimit = this.Core.verifyDateTimeAfterLimit(dateTime);

        if (newDateTimeAfterLimit.newDateTimeAfter) {
            if (this.Core.getIntTimeResidualAfterLimit(dateTime) instanceof Date) {
                var newTimeResidual = 0;
            } else {
                var newTimeResidual = this.Core.getIntTimeResidualAfterLimit(dateTime);
            }

            var newDateTimeStart = this.Core.setStartWork(newDateTimeAfterLimit.dateTime, newTimeResidual);
            
            var newPrevision = this.Core.verifyWeekend(newDateTimeStart);
        }else
        {
            //verifica se a previsao esta anter das 07
            //se estiver 
            //pega o total de horas apartir das 17 até as 00
            //soma com o total de horas até a previsao 
            //soma com o totat da diferenca entre o total de horas até a previsao menos a hora de inicio
            var newDateBeforeStart = this.Core.verifyBeforeTimeStart(dateTime);

            var newPrevision = this.Core.verifyWeekend(newDateBeforeStart);
        }

        

        

        return  newPrevision

    }

}



module.exports = InterfaceCore;
