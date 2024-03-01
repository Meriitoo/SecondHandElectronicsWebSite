const Electronics = require('../models/Electronics');
const User = require('../models/User');



exports.create = async (ownerId, electronicsData) => {
    const createdElectronic = await Electronics.create({ ...electronicsData, owner: ownerId });

    return createdElectronic;
}

exports.getAll = () => Electronics.find({}).lean();

exports.getOne = (electronicsId) => Electronics.findById(electronicsId).lean();

exports.buy = async (userId, electronicsId) => {
    const electronics = await Electronics.findById(electronicsId); 

    electronics.buyingList.push(userId);

    return await electronics.save();
};

exports.edit = (electronicsId, electronicsData) => Electronics.findByIdAndUpdate(electronicsId, electronicsData, { runValidators: true });

exports.delete = (electronicsId) => Electronics.findByIdAndDelete(electronicsId);

exports.search = async (name, type) => {
    let electronics = await this.getAll();

    if (name){
        electronics = electronics.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if (type){
        electronics = electronics.filter(x => x.type == type);
    }

    return electronics;
};