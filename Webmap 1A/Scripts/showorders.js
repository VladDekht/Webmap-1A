$(document).ready(function () {

    function openOrdersList() {
        var menu = document.getElementById("show-orders-container");
        clearOrdersList();
        ordersListSetHeaders();
        menu.style.display = "block";
        menu.style.position = "absolute";
        menu.style.margin = "-88vh 0 0 94vh";
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
            "<th id=\"otherinfo-col\">Other Info</th>" +
            "<th id=\"status-col\">Status</th>";
    }

    function clearOrdersList() {
        var table = document.getElementById("show-orders-table");
        table.innerHTML = "";
    }

    $('#show-orders-button').click(function () {
        openOrdersList();
        var actionUrl = "../api/Me/ShowOrders";
        $.getJSON(actionUrl, function (result) {
            var orderParsed = result;
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
                var status;
                var options;
                for (var j = 0; j < 4; j++) {
                    switch (j) {
                        case 0: status = "Pending";
                            break;
                        case 1: status = "InProcess";
                            break;
                        case 2: status = "Cancelled";
                            break;
                        case 3: status = "Done";
                            break;
                    }
                    if (j !== orderParsed[i].CurrentStatus) {
                        options += "<option value=" + j + ">" + status + "</option>";
                    }
                    else {
                        options += "<option selected =\"selected\" value=" + j + ">" + status + "</option>";
                    }
                    
                }
                
                //var str = "<label class=\"control-label col-md - 2\" for=\"OrderStatus\">Order</label>";
                var select = document.createElement("select");
                select.id = "status-select-" + orderParsed[i].Id;
                select.dataset.id = orderParsed[i].Id;
                select.className = "status-list";
                select.value = orderParsed[i].status;
                ///select.addEventListener("onchange", statusChanged(orderParsed[i].Id));
                var td = document.createElement("td");
                select.innerHTML += options;
                td.append(select);
                tbody.append(td);

                //tbody.append(/*orderParsed[i].Status +*/ "</select></td>");
                tbody.append("</tr>");
            });

            $.each($('.status-list'), function (index, item) {
                item.onchange = function (evt) {
                    statusChanged(evt.srcElement.dataset.id);
                };
            });


            //for (var m = 0; m < 4; m++) {
            //    var id = "status-select-" + m;
            //    document.getElementById(id).addEventListener("onchange", statusChanged(m));
            //}
        });
    });

    
});



function statusChanged(i) {
    var selectId = "status-select-" + i;
    var status = document.getElementById(selectId);
    var data = { "": status.options[status.selectedIndex].value };
    $.ajax({
        //contentType: "application/json; charset=utf-8",
        type: "POST",
        url: "/api/me/" + i + "/setstatus",
        data: data,
        success: function (response) {
            if (response !== null) {
                alert("Id : " + response.id + ", Current Status : " + response.currentStatus);
            } else {
                alert("Something went wrong");
            }
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }  
    });
}

function parseData(result) {
    order = JSON.parse(result);
    console.log(order.count);
}