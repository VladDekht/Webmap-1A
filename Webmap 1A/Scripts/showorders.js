$(document).ready(function () {
    function openOrdersList() {
        var menu = document.getElementById("show-orders-container");
        clearOrdersList();
        ordersListSetHeaders();
        menu.style.display = "block";
        menu.style.position = "absolute";
        menu.style.margin = "-88vh 0 0 80vh";
    }

    function ordersListSetHeaders() {
        var table = document.getElementById("show-orders-table");
        table.innerHTML = "<tr>" + "<th id=\"order-id-col\">Id</th>" +
            "<th id=\"caller-type-col\">Caller Type</th>" +
            "<th id=\"caller-name-col\">Caller Name</th>" +
            "<th id=\"caller-phonenum-col\">Caller PhoneNum</th>" +
            "<th id=\"pickfromaddress-col\">PickFromAddress</th>" +
            "<th id=\"pickfromaddress-zip-col\">PickFromAddress ZIP</th>" +
            "<th id=\"taketoaddress-col\">TakeToAddress City</th>" +
            "<th id=\"taketoaddress-zip-col\">TakeToAddress ZIP</th>" +
            "<th id=\"otherinfo-col\">Other Info</th>";
    }

    function clearOrdersList() {
        var table = document.getElementById("show-orders-table");
        table.innerHTML = "";
    }

    $('#show-orders-button').click(function () {
        openOrdersList();
        var actionUrl = "../api/Me/ShowOrders";
        $.getJSON(actionUrl, function (result) {
            var orderParsed =result;
            var htmlData = "";
            var table = $('#show-orders-table');
            var tbody = table.children("tbody");
            $.each(orderParsed, function (i) {
                tbody.append("<tr id=\"col-num-"+ i + "\">");
                tbody.append("<td>" + orderParsed[i].Id + "</td>");
                tbody.append("<td>" + orderParsed[i].Caller.Type + "</td>");
                tbody.append("<td>" + orderParsed[i].Caller.Name + "</td>");
                tbody.append("<td>" + orderParsed[i].Caller.PhoneNum + "</td>");
                tbody.append("<td>" + orderParsed[i].PickFromAddress.City + " "
                    + orderParsed[i].PickFromAddress.Street + " "
                    + orderParsed[i].PickFromAddress.HouseNum + "</td>");
                tbody.append("<td>" + orderParsed[i].PickFromAddress.Zip + "</td>");
                tbody.append("<td>" + orderParsed[i].TakeToAddress.City + " "
                    + orderParsed[i].TakeToAddress.Street + " "
                    + orderParsed[i].TakeToAddress.HouseNum + "</td>");
                tbody.append("<td>" + orderParsed[i].TakeToAddress.Zip + "</td>");
                tbody.append("<td>" + orderParsed[i].OtherInfo + "</td>");
                tbody.append("</tr>");
            });
            //for (var i = 0; i < orders.length; i++) {
            //    $('#show-orders-container').append("<a>" + htmlData + "</a>");
            //}
        });
    });

    
});

function parseData(result) {
    order = JSON.parse(result);
    console.log(order.count);
}