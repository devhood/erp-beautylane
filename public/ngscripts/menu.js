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
		   description : "Sales",
		   start : true,
		   icon : "fa-home",
		   id : 1,
		   childLink : [
		      {
		          link : "/sales/order",
		          title : "Sales Order",
		          description : "Sales",
		      },
		      {
		          link : "/sales/delivery",
		          title : "Delivery Receipts",
		          description : "Sales",
		      },
		      {
		          link : "/sales/invoice",
		          title : "Sales Invoices",
		          description : "Sales",
		      },
		      {
		          link : "/sales/return",
		          title : "Return Merchandise",
		          description : "Sales",
		      },
		      {
		          link : "/sales/credit",
		          title : "Credit Memo",
		          description : "Sales",
		      }
		   ]
	   },
	   {
		   link : "javascript:;",
		   title : "Admin",
		   description : "Sales",
		   last : true,
		   icon : "fa-gear",
		   id : 2,
		   childLink : [
		      {
		          link : "/customer",
		          title : "Customer",
		          description : "Sales",
		      },
		      {
		          link : "/product",
		          title : "Products",
		          description : "Sales",
		      },
		      {
		          link : "/user",
		          title : "Users",
		          description : "Sales",
		      }
		   ]
	   }
	];
})();