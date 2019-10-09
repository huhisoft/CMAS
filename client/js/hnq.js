// A $( document ).ready() block.
$(document).ready(function () {
    setInterval(function () {
        $.getJSON("/realdata", function (data) {
            $("#i1").html(data[0])
            $("#i2").html(data[1])
            $("#i3").html(data[2])
            $("#iavg").html(data[3])
            $("#v12").html(data[4])
            $("#v23").html(data[5])
            $("#v13").html(data[6])
            $("#vAvg").html(data[7])
            $("#v1").html(data[8])
            $("#v2").html(data[9])
            $("#v3").html(data[10])
            $("#vln").html(data[11])

            $("#kw1").html(data[12])
            $("#kw2").html(data[13])
            $("#kw3").html(data[14])
            $("#kw").html(data[15])
            $("#kvar1").html(data[16])
            $("#kvar2").html(data[17])
            $("#kvar3").html(data[18])
            $("#kvar").html(data[19])
            $("#kva1").html(data[20])
            $("#kva2").html(data[21])
            $("#kva3").html(data[22])
            $("#kva").html(data[23])
            $("#hz").html(data[24])
            $("#kwh").html(data[25])
        });
    }, 5000);
});