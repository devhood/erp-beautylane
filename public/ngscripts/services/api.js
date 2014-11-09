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
        PaymentTerm : $resource('/api/payment_terms/:id',{id:'@_id'},{
            update: {
                method: 'PUT'
            }
        }),
        PriceType : $resource('/api/price_type/:id',{id:'@_id'},{
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
    };
    
})
