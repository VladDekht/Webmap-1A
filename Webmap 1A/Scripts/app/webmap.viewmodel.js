function OrderItemViewModel(data) {

	var self = this;

	self.id = ko.observable(data.Id);
	self.callerType = ko.observable(data.Caller.Type);
	self.callerName = ko.observable(data.Caller.Name);
	self.callerPhone = ko.observable(data.Caller.PhoneNum);

	self.pickFromCity = ko.observable(data.PickFromAddress.City);
	self.pickFromStreet = ko.observable(data.PickFromAddress.Street);
	self.pickFromHouse = ko.observable(data.PickFromAddress.HouseNum);
	self.pickFromZip = ko.observable(data.PickFromAddress.Zip);

	self.pickFromAddress = ko.computed(function () {
		return self.pickFromCity() + " " + self.pickFromStreet() + ' ' + self.pickFromHouse();
	}, self);


	self.takeToCity = ko.observable(data.TakeToAddress.City);
	self.takeToStreet = ko.observable(data.TakeToAddress.Street);
	self.takeToHouse = ko.observable(data.TakeToAddress.HouseNum);
	self.takeToZip = ko.observable(data.TakeToAddress.Zip);

	self.takeToAddress = ko.computed(function () {
		return self.takeToCity() + " " + self.takeToStreet() + ' ' + self.takeToHouse();
	}, self);

	self.otherInfo = ko.observable(data.OtherInfo);

	self.availableStates = ko.observableArray([
		{ key: '0', value: 'Pending' }, { key: '1', value: 'InProcess' },
		{ key: '2', value: 'Cancelled' }, { key: '3', value: 'Done' }]);

	self.selectedStatus = ko.observable(data.CurrentStatus);

	return self;
}

function OrdersListViewModel() {
	var self = this;
	self.items = ko.observableArray();

	self.LoadItems = function (json) {

		self.items.destroyAll();

		if (json == null)
			return;

		for (var i = 0; i < json.length; i++) {
			var item = new OrderItemViewModel(json[i]);
			self.items.push(item);

			item.selectedStatus.subscribe(function (newValue) {
				alert("the new value is1 " + newValue + "---" + this.id());
				return;

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

			}, item, "change");
		}
	};

	return self;
}


function WebMapViewModel(app, dataModel) {
	var self = this;

	self.ordersList = new OrdersListViewModel();

	self.shouldShowOrders = ko.observable(false);

	self.showOrders = function () {

		dataModel.getOrders().then(function (result) {

			self.ordersList.LoadItems(result);
			self.shouldShowOrders(true);
		});
	};

	self.hideOrders = function () {
		self.shouldShowOrders(false);
	};

	return self;
}

app.addViewModel({
	name: "WebMap",
	bindingMemberName: "webmap",
	factory: WebMapViewModel
});
