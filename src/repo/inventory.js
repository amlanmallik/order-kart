const attr = { exclude: ['createdAt', 'updatedAt', 'status'] }
module.exports = ({ db, logger: { errorLogObj } }) => {
    const { Op } = db.Sequelize;
    const checkInventory = async (document) => {
        let checkObj = null;
        try {
            if (document) {
                const filterObj = {
                    status: true
                }
                if (!document.seeAll) {
                    filterObj['quantity'] = { [Op.gt]: 0 }
                }
                if (document.itemId) {
                    filterObj['itemId'] = document.itemId;
                }
                checkObj = await db['Inventory'].findOne({
                    where: filterObj,
                    attributes: attr
                })
            }
            else {
                throw { error: 'illegal arguments!' }
            }
        } catch (err) {
            throw errorLogObj('repo -> inventory', err);
        }
        return checkObj;
    }

    const updateInventory = async (document, t) => {
        let updateObj = null;
        try {
            if (document && document.itemId && document.quantity) {
                let updateFilter = { itemId: document.itemId }
                let updateBody = { quantity: document.updatedQuantity }
                let searchObj = t ? { where: updateFilter, transaction: t } : { where: updateFilter }
                updateObj = await db['Inventory'].update(updateBody, searchObj)
            }
            else {
                throw { error: 'illegal arguments!' }
            }
        } catch (err) {
            throw err;
        }
        return updateObj;
    }

    return { checkInventory, updateInventory }
}