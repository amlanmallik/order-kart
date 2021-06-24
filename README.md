# Order Kart
## Introduction
---
- An API to create order.
- Every user can order the same item multiple times as
long as the inventory
exists.

## Libraries
---
- express v4.17.1.
- awilix v4.3.4.
- body-parser v1.19.0.
- cors v2.8.5.
- fs v0.0.1-security.
- mysql2 v2.2.5.
- path v0.12.7.
- sequelize v6.6.2.

## Database
---
- Mysql 14.14.
- [Database structure](./Reference_resources/Order_Kart.png)
## Sample
---
### Request
**url :**
```sh
POST http://localhost:3200/api/order/create
```
**body :**
```json
{
	"userId":1,
	"itemId":2,
	"quantity":20
}
```
<br/>

### Response
**status :**
```sh
200 OK
```
**body :**
```json
{
    "data": {
        "createdAt": <created timestamp>,
        "updatedAt": <updated timestamp>,
        "status": true,//default showing its an active order.
        "orderId": <order-id>,
        "UserUserId": <userId>,
        "InventoryItemId": <itemid>,
        "quantity": 2
    },
    "error": null
}
```