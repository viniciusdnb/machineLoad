
    
class Core {

    constructor(configWorks, prevision) {
        this.configWorks = configWorks;
        this.prevision = prevision;
    }

    nextDate() {

        var dateTimeNow = new Date(this.prevision);
        var timeLimit = this.configWorks.timeLimit;
        dateTimeNow.setHours(timeLimit);
        var previsionHour = this.prevision.getHours();
        var hourLimit = dateTimeNow.getHours();

        //verifica se a previsao esta dentro do horario permitido ate as 17
        //caso esteja fora acresentara mais um dia na data 
        //e verifica se a nova data é dia util
        var result =  previsionHour - hourLimit;
        if(result <= -7){
            
            for (let i = 0; i <= 7; i++) {
                if(previsionHour == i){
                    var hourResidual = 7 + i
                }   
            }
        }else{
            var hourResidual = previsionHour - hourLimit
        }

        
        

        if (previsionHour >= hourLimit) {
            var nextDay = dateTimeNow.getDate() + 1;
            
           
            var newDateTime = this.setNewtimeDay(dateTimeNow, nextDay, hourResidual);
            return { "newPrevision": this.verifyDateWeekend(newDateTime,hourResidual)};
            //mesmo que a previsao esteja dentro do permitido verifca se é dia util
        } else if (dateTimeNow.getDay() == 0 || dateTimeNow.getDay() == 6) {
            return { "newPrevision": this.verifyDateWeekend(dateTimeNow,hourResidual)};
        }
        //caso a previsao esteja dentro do horario permito verifica se 
        //a previsao nao esta de madrugada
        //caso esteja de madrugada set uma novo horario de inicio do trabalho
        return { "newPrevision": this.verifyDateWeekend(this.nextHourStart(),hourResidual) };

    }

    nextHourStart() {
        //verifica se o horario nao esta de madrugada e acerta para a primeira hora de trabalho
        var dateTimeNow = new Date(this.prevision);
        var timeStart = this.configWorks.timeStart;
        dateTimeNow.setHours(timeStart);
        var previsionHour = this.prevision.getHours();
        var hourStart = dateTimeNow.getHours();

        if (previsionHour < hourStart) {
            return this.setNewtimeDay(dateTimeNow, dateTimeNow.getDate(), 0);
        }

        return this.prevision;
    }

    verifyDateWeekend(dateTimeNow, hourResidual) {
        //sabado > numero 6
        //domingo > numero 0
        //console.log(dateTimeNow.getDay());
        switch (dateTimeNow.getDay()) {
            case 0:
                var newNumberDate = "";
                if (!this.configWorks.sunday) {
                    newNumberDate = dateTimeNow.getDate() + 1;
                } else {
                    newNumberDate = dateTimeNow.getDate();
                }

                return this.setNewtimeDay(dateTimeNow, newNumberDate, hourResidual);
                break;
            case 6:
                var newNumberDate = "";
                if (!this.configWorks.saturday) {
                    newNumberDate = dateTimeNow.getDate() + 2;
                } else {
                    newNumberDate = dateTimeNow.getDate();
                }
                return this.setNewtimeDay(dateTimeNow, newNumberDate, hourResidual);
                break;
            default:
                return dateTimeNow;
                break;
        }
    }

    setNewtimeDay(date, newNumberDate, hourResidual) {
        date.setDate(newNumberDate);
        date.setHours(this.configWorks.timeStart + hourResidual);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }

    

}


module.exports = Core;