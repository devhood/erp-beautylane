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
		   icon : "fa-home",
		   id : 1,
		   childLink : [
		      {
		          title : "Sales Order",
		          description : "Create Sales Order",
							sref : "salesOrder"
		      },
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
		          title : "Sales Invoices",
		          description : "Approve Sales Invoices",
							sref : "salesInvoice"
		      },
					{
							title : "Print DR and SI",
							description : "Print Dr and SI",
							sref : "salesPrint"
					},
					{
							title : "Trip Ticket",
							description : "Print and Update Trip Ticket",
							sref : "salesTripTicket"
					},
		      {
		          title : "Return Merchandise",
		          description : "Return Sales Item",
							sref : "salesReturn"
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
	   }
	];
})();
