const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  ext_number: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  b_day: {
    type: Date,
    required: false
  },
  hire_day: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  em_photo: {
    type: String,
    required: false
  },
  dep_id: {
    type: String,
    required: false
  }
})

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema)

module.exports.addEmployee = (newEmployee, callback) => {

  if(newEmployee.name === '') {
		res.json({success: false, msg: 'Name field is required.'})
		return false
	} else if(newEmployee.email === '') {
    req.json({success: false, msg: 'Email field is required.'})
    return false
  } else if(newEmployee.job_title === '') {
    req.json({succes: false, msg: 'Job title field is required.'})
    return false
  } else if(newEmployee.gender === '') {
    req.json({succes: false, msg: 'Gender field is required.'})
    return false
  }

  Employee.find({email: newEmployee.email}, (err, docs) => {
    if(docs.length) {
      callback({msg: "This email is already in use by another employee."}, null)
    } else {
      Employee.find({ext_number: newEmployee.ext_number}, (err, data) => {
        if(data.length) {
          callback({msg: "This external number is already in use by another employee."}, null)
        } else {
          newEmployee.save(callback)
        }
      })
    }
  })
}

module.exports.getEmployeeByName = (name, callback) => {
	const query = {name: name}
	Employee.findOne(query, callback)
}

module.exports.getEmployeeById = (id, callback) => {
	Employee.findById(id, callback)
}
