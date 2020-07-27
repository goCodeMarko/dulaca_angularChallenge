import { R3BoundTarget, ThrowStmt, TryCatchStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from "./../products/products.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  public cart: any[] = [];
  public itemVoid: any[] = [];
  public transaction: any[] = [];

  public tax: number = 0.12;
  public discountPercentage: number = 0.20;
  public rbtnResult = "regular";

  private change: number;
  private catchSubTotal: number;
  private total: number;
  private vat: number;
  private totalDiscount: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  calculate(): void {
    //OOP Encapsulation Principle
    this.setSubTotal();
    this.setChargeTax(this.tax);
    this.setDiscount(this.discountPercentage, this.rbtnResult);
  }

  //Setters
  private setSubTotal(): void {
    //Adding each prices of the item in the cart.
    this.catchSubTotal = this.cart.reduce((prev, current) => {
      let result = prev + current.subTotal;
      return parseFloat(result.toFixed(2))

    }, 0)
  }

  private setChargeTax(tax): void {
    //Calculates the VAT.
    let result = this.catchSubTotal * tax;

    this.vat = parseFloat(result.toFixed(2));

    //Calculates the sub total and adding the calculated vat.
    this.total = this.catchSubTotal + this.vat;
  }

  private setDiscount(discount, rbtnResult) {
    if (rbtnResult == "sc_pwd") {
      //Calculates total discount.
      this.totalDiscount = this.total * discount;

      this.total -= this.totalDiscount;
    } else {
      //Calculates previous total if no discount detected.
      this.total += this.totalDiscount

      //Sets the total discount to zero.
      this.totalDiscount = 0;
    }
  }

  private setChange(cash, total) {
    let result = cash - total;
    this.change = parseFloat(result.toFixed(2));
  }

  //Getters
  getSubtotal() { //Gets the subtotal.
    return this.catchSubTotal
  }

  getChargeTax() { //Gets the tax.
    return this.vat
  }

  getDiscount() { //Gets the discount.
    return this.totalDiscount
  }

  getTotal() { //Gets the total.
    return this.total
  }

  getChange() { //Fets the change.
    return this.change;
  }

  remove(index, id): void {
    let result: boolean = confirm("Void Selected Item.");

    if (result) {
      /*Filters the cart using the id then setting the itemVoid array
       equal to filtered value and sends this data to the children
       to make the quantity back to the previous value.*/
      this.cart.filter(val => {
        if (val.id === id) {
          this.itemVoid = [val]
        }
      })

      //Removing the selected object from the cart array,
      this.cart.splice(index, 1);
    }
  }

  removeAll(items) {
    let result: boolean = confirm("Void Transaction.");

    if (result) {
      //Sets the objects of cart and to be pass to children component.
      this.itemVoid = items

      //Clears the cart array.
      this.cart = [];
    }
  }

  rbtnChange(value) {
    //Everytime radio button changes the data would update.
    this.rbtnResult = value;
  }

  checkOut(cart, catchSubTotal, vat, totalDiscount, total) {
    let cash = parseInt(prompt("Cash Amount."));
    let change: number;

    if (cash < total && cash >= 0) {
      alert("Insufficient Cash");
    } else if (isNaN(cash) || cash < 0) {
      alert("Invalid Input");
    } else {
      this.setChange(cash, total);

      change = this.getChange();

      this.transaction.push({ items: cart, subTotal: catchSubTotal, vat: vat, discount: totalDiscount, total: total, change: change });
      console.log(this.transaction);

      alert(
        "VATable Sales: $" + this.transaction[0].subTotal + "\n" +
        "VAT Amount: $" + this.transaction[0].vat + "\n" +
        "Discount: $" + this.transaction[0].discount + "\n" +
        "Total (Incl. VAT): $" + this.transaction[0].total + "\n" +
        "Change: $" + this.transaction[0].change
      );
    }
  }

}
