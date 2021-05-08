const TaskModel = require('../model/TaskModel');
const  { isPast } = require('date-fns');


const TaskValidation = async (req, res, next) => {
    
    const { macaddress, type, title, description, when } = req.body;

    if(!macaddress)
    return res.status(400).json({ error: 'macaddress is require'})
    if(!type)
    return res.status(400).json({ error: 'type is require'})
    if(!title)
    return res.status(400).json({ error: 'title is require'})
    if(!description)
    return res.status(400).json({ error: 'description is require'})
    if(!when)
    return res.status(400).json({ error: 'date and hour is require'})
    
    else {

        let exists;

        if(req.params.id){
            exists = await TaskModel.findOne({
                '_id': {'$ne': req.params.id},
                'when': {'$eq': new Date(when)},
                'macaddress': {'$in': macaddress}
            });
        } else {
        if(isPast(new Date(when)))
            return res.status(400).json({ error: 'choice a date and hour'})
        exists = await TaskModel.findOne({
            'when': {'$eq': new Date(when)},
            'macaddress': {'$in': macaddress}
        });
        }

        if(exists){
            return res.status(400).json({ error: " Existing Task "})
        }

        next();
    }

}

module.exports = TaskValidation;