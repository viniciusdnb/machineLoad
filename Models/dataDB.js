const dataDB = {
    "fila":[{
        'sequencia': 1,
        'ordemProducao': 100,
        'loteProducao': 99,
        'cliente': 'Innovart',
        'produto':'Infinit',
        'quantidadePedido': 10000,
        'quantidadeProduzido': 5000,
        'maquina': 'P1',
        'bpm': 33,
        'emProducao': true, 
        'dataHoraInicioProducao': "2025-05-01T07:00:00Z",
        'dataHoraAtual' : '',
        'previsaodataHoraInicioProducao':'',
        'previsaoFinalProducao': ''
                 
    },
    {
       'sequencia': 2,
        'ordemProducao': 101,
        'loteProducao': 100,
        'cliente': 'Innovart',
        'produto':'barquinho',
        'quantidadePedido': 100000,
        'quantidadeProduzido': 0,
        'maquina': 'P1',
        'bpm': 33,
        'emProducao': false,
        'dataHoraInicioProducao': '',
        'dataHoraAtual' : '',
        'previsaodataHoraInicioProducao':'',
        'previsaoFinalProducao': ''
        
            
    }, {
        'sequencia': 3,
         'ordemProducao': 102,
         'loteProducao': 101,
         'cliente': 'Innovart',
         'produto':'amore',
         'quantidadePedido': 20000,
         'quantidadeProduzido': 0,
         'maquina': 'P1',
         'bpm': 33,
         'emProducao': false,
         'dataHoraInicioProducao': '',
         'dataHoraAtual' : '',
         'previsaodataHoraInicioProducao':'',
         'previsaoFinalProducao': ''
         
             
     },
        
         {
            'sequencia': 4,
             'ordemProducao': 103,
             'loteProducao': 102,
             'cliente': 'Innovart',
             'produto':'portioli',
             'quantidadePedido': 50000,
             'quantidadeProduzido': 0,
             'maquina': 'P1',
             'bpm': 33,
             'emProducao': false,
             'dataHoraInicioProducao': '',
             'dataHoraAtual' : '',
             'previsaodataHoraInicioProducao':'',
             'previsaoFinalProducao': ''
            
                 
         }
    ]       
    
};

module.exports = dataDB;