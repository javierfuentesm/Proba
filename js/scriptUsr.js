filas = 0;

function addFila() {
    $("#nuevasFilas").append(
       '<tr class="table-active" id="columna'+filas+'">'+
            '<td><input id="xValue'+filas+'" class="form-control" type="number"></td>'+
            '<td><input id="fxValue'+filas+'" class="form-control" type="number"></td>'+
       '</tr>'
    );
    filas++;
}

function graphFX() {
    var ok = false;
    if (filas>0){
        for (var i=0;i<filas;i++){
            if($("#xValue"+i).val()!="" && $("#fxValue"+i).val()!=""){
                ok = true;
            }else{
                ok = false;
                break;
            }
        }
        if (ok) {
            $("#graficaTitle").empty();
            $("#graficaTitle").append("<h1>Grafica F(x)</h1>");
            var data = [];
            var inData = {};
            for (var i=0;i<filas;i++){
                inData = {
                    x: $("#xValue"+i).val(),
                    value: $("#fxValue"+i).val(),
                };
                data.push(inData);
            }
            $("#graficaFX").empty();
            new Morris.Bar({
                element: 'graficaFX',
                data: data,
                xkey: 'x',
                ykeys: ['value'],
                parseTime: false,
                resize: true,
                lineWidth: 1,
                labels: ['Value']
            });
        }
    }
}

function generarAcum() {
    var ok = false;
    if (filas>0){
        for (var i=0;i<filas;i++){
            if($("#xValue"+i).val()!="" && $("#fxValue"+i).val()!=""){
                ok = true;
            }else{
                ok = false;
                break;
            }
        }
    }

    if (ok){
        $("#namesTable").append('<th>f(x) acum</th>');
        var valueAcum = 0;
        for (var i=0;i<filas;i++){
            if (i==0){
                valueAcum = $("#fxValue"+i).val();
                $("#columna"+i).append('<td><input value="'+valueAcum+'" id="fxAcumValue'+i+'" class="form-control" type="number" readonly="true"></td>');
            }else{
                valueAcum = parseInt($("#fxValue"+i).val()) + parseInt($("#fxValue"+(i-1)).val());
                $("#columna"+i).append('<td><input value="'+valueAcum+'" id="fxAcumValue'+i+'" class="form-control" type="number" readonly="true"></td>');
            }
        }
        $("#btnAcumGraph").fadeIn();
        $("#btnGenAcum").attr('disabled','disabled');
    }

}

function graphAcum() {
    var ok = false;
    if (filas>0){
        for (var i=0;i<filas;i++){
            if($("#xValue"+i).val()!="" && $("#fxValue"+i).val()!="" && $("#fxAcumValue"+i).val()!=""){
                ok = true;
            }else{
                ok = false;
                break;
            }
        }
        if (ok) {
            $("#graficaAcumTitle").empty();
            $("#graficaAcumTitle").append("<h1>Grafica F(x) Acumulativa</h1>");
            var data = [];
            var inData = {};
            for (var i=0;i<filas;i++){
                inData = {
                    x: $("#xValue"+i).val(),
                    value: $("#fxAcumValue"+i).val(),
                };
                data.push(inData);
            }
            $("#graficaAcum").empty();
            new Morris.Line({
                element: 'graficaAcum',
                data: data,
                xkey: 'x',
                ykeys: ['value'],
                parseTime: false,
                resize: true,
                lineWidth: 1,
                labels: ['Value']
            });
        }
    }
}