
module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        if(item){
            let cartItem = this.items[id];
        if(!cartItem) {
            cartItem = this.items[id]={ item: item, quantity: 0, price: 0};
        }
        cartItem.quantity ++;
        cartItem.price += cartItem.item.price;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
        }
        console.log(this.totalPrice)
    }
    this.sub = function (item, id) {
       if(item){
        let cartItem = this.items[id];
        if(cartItem){
            if(cartItem.quantity > 1){
                cartItem.quantity --;
                cartItem.price -= cartItem.item.price ;
                this.totalItems --;
                this.totalPrice -= cartItem.item.price;
            }
        }
       }
      }
    this.remove = id => {

        let cartItem = this.items[id];
        console.log(this.totalPrice , cartItem.price)
        this.totalItems -= cartItem.quantity;
        this.totalPrice -= cartItem.price;
        delete this.items[id];
    };

    this.getItems = () => {
        let arr = [];
        for (let id in this.items){
            arr.push(this.items[id]);
        }
        return {
            arr
        };
    };
};