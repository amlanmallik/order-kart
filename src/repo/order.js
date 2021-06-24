const includeAttr = ['quantity', 'orderId'];
module.exports = ({ inventoryRepo: { updateInventory }, db, logger: { errorLogObj } }) => {

    const checkOrders = async (document) => {
        let checkObj = null;
        try {
            if (document && document.userId) {
                const { userId } = document;
                const filterObj = {
                    userId: userId,
                    status: true
                }
                checkObj = await db['Orders'].findAll({
                    where: filterObj,
                    attributes: includeAttr
                })
            }
            else {
                throw { error: 'illegal arguments!' }
            }
            return checkObj;
        } catch (err) {
            let errorObj = errorLogObj('repo -> order', err);
            throw errorObj;
        }
    }

    const insertOrder = async (document, t) => {
        let updateObj = null;
        try {
            if (document && document.userId && document.itemId) {
                const { userId, itemId } = document;
                let updateParams = {
                    UserUserId: userId,
                    InventoryItemId: itemId,
                    quantity: document.quantity
                };
                updateParams = t ? { ...updateParams, transaction: t } : { ...updateParams };
                updateObj = await db['Orders'].create(updateParams, t);
            }
            else {
                throw { error: 'illegal arguments!' }
            }
            return updateObj;
        } catch (err) {
            let errorObj = errorLogObj('repo -> order', err);
            throw errorObj;
        }
    }

    const createOrder = async (document) => {
        let updateObj = null;
        try {
            let t = await db.sequelize.transaction();
            updateInventory(document, t);
            updateObj = insertOrder(document, t);
            await t.commit();
            return updateObj;
        } catch (err) {
            if (t) await t.rollback();
            let errorObj = errorLogObj('repo -> order', err);
            throw errorObj;
        }
    }

    return { checkOrders, insertOrder, createOrder }
}