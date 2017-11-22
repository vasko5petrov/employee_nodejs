const express = require('express')
const router = express.Router()

const Employee = require('../models/employee')

router.post('/add', (req, res) => {
  let newEmployee = new Employee({
    name: req.body.name,
    job_title: req.body.job_title,
    ext_number: req.body.ext_number,
    email: req.body.email,
    b_day: req.body.b_day,
    hire_day: req.body.hire_day,
    gender: req.body.gender,
    location: req.body.location,
    em_photo: req.body.em_photo,
    dep_id: req.body.dep_id
  })

  Employee.addEmployee(newEmployee, (err, employee) => {
		if(err) {
			res.json({success: false, msg: err.msg})
		} else {
			res.json({success: true, msg: "Employee added."})
		}
	})
})

router.get('/:id', (req, res) => {
  Employee.getEmployeeById(req.params.id, (err, employee) => {
    if(err) {
      res.json({success: false, msg: "Employee not found."})
    }
    if(employee) {
      res.json({success: true, employee})
    } else {
      res.json({success: false, msg: "Employee not found."})
      return false
    }
  })
})

router.post('/:id/update', (req, res) => {
  let updatedEmployee = {
    name: req.body.name,
    job_title: req.body.job_title,
    ext_number: req.body.ext_number,
    email: req.body.email,
    b_day: req.body.b_day,
    hire_day: req.body.hire_day,
    gender: req.body.gender,
    location: req.body.location,
    em_photo: req.body.em_photo,
    dep_id: req.body.dep_id
  }

  if(updatedEmployee.name === '') {
		res.json({success: false, msg: 'Name field is required.'})
		return false
	} else if(updatedEmployee.email === '') {
    req.json({success: false, msg: 'Email field is required.'})
    return false
  } else if(updatedEmployee.job_title === '') {
    req.json({succes: false, msg: 'Job title field is required.'})
    return false
  } else if(updatedEmployee.gender === '') {
    req.json({succes: false, msg: 'Gender field is required.'})
    return false
  }

  Employee.getEmployeeById(req.params.id, (err, employee) => {
    if(err) {
      res.json({success: false, msg: "Employee not found."})
      return false
    }
    if(employee) {

      if(employee.title === updatedEmployee.title) {
        Employee.update({_id: employee._id}, updatedEmployee, (err) => {
          if(err) {
            res.json({success: false, msg: err.message})
            return false
          } else {
            res.json({success: true, msg: `Employee has been updated.`})
          }
        })
      } else {
        Employee.find({email: updatedEmployee.email}, (err, docs) => {
          if(docs.length) {
            callback({msg: "This email is already in use by another employee."}, null)
          } else {
            Employee.update({_id: employee._id}, updatedEmployee, (err) => {
              if(err) {
                res.json({success: false, msg: err.message})
                return false
              } else {
                res.json({success: true, msg: `Employee has been updated.`})
              }
            })
          }
        })
      }

    } else {
      res.json({success: false, msg: "Employee not found."})
      return false
    }
  })
})

router.delete('/:id/delete', (req, res) => {
  Employee.getEmployeeById(req.params.id, (err, employee) => {
    if(err) {
      res.json({success: false, msg: "Employee not found."})
      return false
    }
    if(employee) {
      let query = {_id:req.params.id}
      Employee.remove(query, (err) => {
        if(err) {
          res.json({success: false, message: `There was a problem! Employee has not been deleted`})
          return false
        }
        res.json({success: true, message: `Employee has been deleted`})
      })
    } else {
      res.json({success: false, msg: "Employee not found."})
      return false
    }
  })
})

module.exports = router
