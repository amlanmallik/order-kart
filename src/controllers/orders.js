const container = require('../container');
const express = require('express');
const router = express.Router();

module.exports = () => {
    const { inventoryRepo: { checkInventory }, orderRepo: { createOrder }, logger: { errorLogObj }, wrapResponse: { wrapResponse } } = container.cradle;

    router.post('/create', async (req, res, next) => {
        try {
            const document = req.body;
            if (document && document.userId && document.itemId && document.quantity) {
                const checkInventoryObj = { itemId: document.itemId, seeAll: false };
                let inventoryLookup = await checkInventory(checkInventoryObj);
                inventoryLookup = inventoryLookup ? inventoryLookup.dataValues : null;
                if (inventoryLookup && inventoryLookup.quantity >= document.quantity) {
                    let newQty = inventoryLookup.quantity - document.quantity;
                    let createObj = { userId: document.userId, itemId: document.itemId, quantity: document.quantity, updatedQuantity: newQty };
                    let orderCreationPromObj = await createOrder(createObj);
                    let response = wrapResponse(orderCreationPromObj, null);
                    res.json(response);
                }
                else {
                    throw { error: 'item invalid or exceeds the maximum available quantity!' }
                }
            }
            else {
                throw { error: 'illegal arguments!' }
            }
        } catch (err) {
            let errorObj = errorLogObj('controller -> orders', err);
            let response = wrapResponse(null, errorObj);
            res.status(500).json(response);
        }
        res.end();
    })

    return router;
}