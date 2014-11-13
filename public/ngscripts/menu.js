(function(){
	var app = angular.module('menu',['notification']);

	app.controller('MenuController', function(){
		this.menus = menus;
		this.active = 0;
		this.isActive = function(active){
			return this.active === active;
		};
		this.setActive = function(active){
			this.active = active;
		}
	});

	var menus = [
	   {
		   link : "javascript:;",
		   title : "Sales",
		   start : true,
		   icon : "fa-shopping-cart",
		   id : 1,
		   childLink : [
			      {
			          title : "Proforma Invoice",
			          description : "Create Proforma Invoice",
								sref : "salesProforma"
			      },
			      {
			          title : "Sales Order",
			          description : "Create Sales Order",
								sref : "salesOrder"
			      },
			      {
			          title : "Return Merchandise",
			          description : "Return Sales Item",
								sref : "salesReturn"
			      }
			   ]
		   },
			 {
				link : "javascript:;",
				title : "Warehouse",
				last : true,
				icon : "fa-archive",
				id : 2,
				childLink : [
					{
							title : "Print Pick List",
							description : "Prepare Items for Delivery",
							sref : "salesPickList"
					},
					{
							title : "Delivery Receipts",
							description : "Prepare and Approve Items for Delivery",
							sref : "salesDelivery"
					},
					{
							title : "Trip Ticket",
							description : "Print and Update Trip Ticket",
							sref : "salesTripTicket"
					},
					{
							title : "Print DR and SI",
							description : "Print Dr and SI",
							sref : "salesPrint"
					},
					{
							title : "Return Merchandise",
							description : "Return Sales Item",
							sref : "salesReturn"
					},
				]
			},
			{
				link : "javascript:;",
				title : "Finance",
				start : true,
				icon : "fa-suitcase",
				id : 1,
				childLink : [
						{
								title : "Sales Invoices",
								description : "Approve Sales Invoices",
								sref : "salesInvoice"
						},
						{
								title : "Credit Memo",
								description : "Apply for Credit Memo",
								sref : "salesMemo"
						},
						{
								title : "Payment",
								description : "Record Payment",
								sref : "salesPayment"
						}
					]
				},
				{
					link : "javascript:;",
					title : "Shipment",
					last : true,
					icon : "fa-truck",
					id : 2,
					childLink : [
						{
								title : "Shipments",
								description : "Manage Shipments",
								sref : "shipments"
						}
					]
				},
				{
					link : "javascript:;",
					title : "Purchase",
					last : true,
					icon : "fa-plane",
					id : 2,
					childLink : [
						{
								title : "Purchase",
								description : "Manage Purchase",
								sref : "purchases"
						}
					]
				},
			   {
				   link : "javascript:;",
				   title : "Admin",
				   last : true,
				   icon : "fa-gear",
				   id : 2,
				   childLink : [
				      {
				          title : "Customer",
				          description : "Manage Customers",
									sref : "customers"
				      },
				      {
				          title : "Products",
				          description : "Manage Products",
									sref : "products"
				      },
				      {
				          title : "Users",
				          description : "Manage Users",
									sref : "users"
				      }
				   ]
			   },
	];
})();
