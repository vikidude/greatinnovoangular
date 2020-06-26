export class Order {
    customer_name: string;
    customer_mobile_number: number;
    address: string;
    order_number: number;
    total_items_count: number;
    total_cost: number;
    order_products: {
        item_name: Array<string>;
        item_price: Array<number>;
        quantity: Array<number>;
    }
}
