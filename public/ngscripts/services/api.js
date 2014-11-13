angular.module('serviceApp.reference',[])
.factory('Api',function($resource){
    return {
        Position : $resource('/api/positions/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        CustomerType : $resource('/api/customer_type/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        PaymentTerm : $resource('/api/payment_term/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        PriceType : $resource('/api/price_type/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),

        SalesExecutive : $resource('/api/users?filter='+encodeURIComponent(JSON.stringify({"position":"Sales Executive"})),{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Geography : $resource('/api/geography/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Location : $resource('/api/location/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Condition : $resource('/api/condition/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        OrderSource : $resource('/api/order_source/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        ShippingMode : $resource('/api/shipping_mode/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        UserStatus : $resource('/api/user_status/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        CustomerStatus : $resource('/api/customer_status/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Country : $resource('/api/countries/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Brand : $resource('/api/brands/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        ProductStatus : $resource('/api/product_status/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        ShipmentStatus : $resource('/api/shipment_status/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Uom : $resource('/api/uom/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Movement : $resource('/api/movements/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Supplier : $resource('/api/suppliers/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Currency : $resource('/api/currencies/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        TransactionType : $resource('/api/transaction_types/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Customer : $resource('/api/customers/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Discount : $resource('/api/discounts/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        InventoryLocation : $resource('/api/inventory_location/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        Product : $resource('/api/products/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        SalesStatus : $resource('/api/sales_status/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        })
    };

})
