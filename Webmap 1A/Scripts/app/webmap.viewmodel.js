function AddOrderViewModel(app, dataModel) {
	var self = this;

	self.otherInfo = ko.observable("Info");

	saveChanges = function () {
		debugger;
		//$.post( "../api/me/order", $( "#fNewOrder" ).serialize() );
		var jsonObj = ko.mapping.toJS(self);

		$.ajax({
			method: 'post',
			url: "../api/me/order",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(jsonObj),
			dataType: "json",
			//headers: {
			//	'Authorization': 'Bearer ' + app.dataModel.getAccessToken()
			//},
			success: function (data) {
				alert("DONE");
			}
		});
	}

	return self;
}

app.addViewModel({
	name: "AddOrder",
	bindingMemberName: "newOrder",
	factory: AddOrderViewModel
});
