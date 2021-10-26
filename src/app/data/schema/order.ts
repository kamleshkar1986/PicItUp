import { User } from './user';

export interface Order {
  _id: string;
  itemName: string;
  units: number;
  unitPrice: number;
  totalPrice: number;
  photos: File[];
  inCart: boolean;
  orderStatus: string;
  refundRequested: boolean;
  paymentStatus: string;
  user: User;
  cartDate: Date;
  orderDate: Date;
  createdAt: Date;
}

export enum OrderStatus {
  Carted, //When order is in cart
  Suspended, //When order payment has failed
  Placed, //Order placed (Payment must be successful)
  Initiated, //Order finalised for making
  Preparing, //Work In Progress
  Prepared, //End product ready
  Dispatched, //Dispatched for delivery
  InTransit, //InTransit
  Delivered, //Product delivered to customer
}

export enum PaymentStatus {
  Initiated, //When user initiated PG payment
  Successful, //When PG payment is successful
  Failed, //When PG payment fails
}

/*
enum States {
    New,
    Active,
    Disabled
} 

// this will show message '0' which is number representation of enum member
alert(States.Active); 

// this will show message 'Disabled' as string representation of enum member
alert(States[States.Disabled]);
*/
