function AppDataModel() {
    var self = this;
    // Routes
    self.userInfoUrl = "/api/Me";
	self.siteUrl = "/";
	
    // Route operations

    // Other private operations

    // Operations

    // Data
    self.returnUrl = self.siteUrl;

    // Data access operations
    self.setAccessToken = function (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
    };

    self.getAccessToken = function () {
        return sessionStorage.getItem("accessToken");
	};

	self.getOrders = function () {

		return new Promise(function (resolve, reject) {

			let ordersUrl = "../api/Me/ShowOrders";
			$.ajax({
				method: 'get',
				url: ordersUrl,
				contentType: "application/json; charset=utf-8",
				headers: {
					'Authorization': 'Bearer ' + self.getAccessToken()
				},
				success: function (result) {
					resolve(result);
				}
			});

		});

	};
}
