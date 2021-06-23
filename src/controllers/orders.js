const container = require('../container');
const express = require('express');
const path = require('path');
const router = express.Router();

module.exports = () => {
    const { logger: { errorLogObj }, inventoryRepo: { checkInventory }, orderRepo: { createOrder } } = container.cradle;
    router.post('/create', async (req, res, next) => {
        try {
            const document = req.body;
            if (document && document.userId && document.itemId && document.quantity) {
                const checkInventoryObj = { itemId: document.itemId, seeAll: false };
                let inventoryLookup = await checkInventory(checkInventoryObj);
                inventoryLookup = inventoryLookup ? inventoryLookup.dataValues : null;
                if (inventoryLookup && inventoryLookup.quantity >= document.quantity) {
                    let createObj = { userId: document.userId, itemId: document.itemId, quantity: document.quantity }
                    let orderCreation = await createOrder(createObj);
                    res.json({ data: orderCreation });
                }
                else {
                    res.status(403).json({ error: 'impossible to create order!' })
                }
            }
            else {
                res.status(403).json({ error: 'illegal!' })
            }
        } catch (err) {
            res.status(500).json(errorLogObj(path.resolve(__dirname, __filename), err));
        }
        res.end();
    })

    return router;
}