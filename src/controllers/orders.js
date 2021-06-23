const container = require('../container');
const express = require('express');
const path = require('path');
const router = express.Router();

module.exports = () => {
    const { inventoryRepo: { checkInventory, updateInventory }, orderRepo: { createOrder } } = container.cradle;
    router.post('/create', async (req, res, next) => {
        try {
            const document = req.body;
            if (document && document.userId && document.itemId && document.quantity) {
                const checkInventoryObj = { itemId: document.itemId, seeAll: false };
                let inventoryLookup = await checkInventory(checkInventoryObj);
                inventoryLookup = inventoryLookup ? inventoryLookup.dataValues : null;
                if (inventoryLookup && inventoryLookup.quantity >= document.quantity) {
                    let newQty = inventoryLookup.quantity - document.quantity;
                    let updateBody = { itemId: document.itemId, quantity: newQty }
                    let updateInventoryPromObj = updateInventory(updateBody);
                    let createObj = { userId: document.userId, itemId: document.itemId, quantity: document.quantity }
                    let orderCreationPromObj = createOrder(createObj);
                    let orderCreation = await Promise.all([updateInventoryPromObj, orderCreationPromObj]);
                    res.json({ data: orderCreation[1] });
                }
                else {
                    throw { error: 'impossible to create order!' }
                }
            }
            else {
                throw { error: 'illegal arguments!' }
            }
        } catch (err) {
            res.status(500).json(err);
        }
        res.end();
    })

    return router;
}