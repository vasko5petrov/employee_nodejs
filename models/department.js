const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  office_number: {
    type: Number,
    required: false
  },
  manager_id: {
    type: String,
    required: true
  }
})

const Department = module.exports = mongoose.model('Department', DepartmentSchema)

module.exports.addDepartment = (newDepartment, callback) => {

  if(newDepartment.name === '') {
		res.json({success: false, msg: 'Name field is required.'})
		return false
	} else if(newDepartment.manager_id === '') {
    req.json({success: false, msg: 'Manager field is required.'})
    return false
  } else {
    newDepartment.save(callback)
  }
}

module.exports.getDepartmentByName = (name, callback) => {
	const query = {name: name}
	Department.findOne(query, callback)
}

module.exports.getDepartmentById = (id, callback) => {
	Department.findById(id, callback)
}
