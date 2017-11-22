const express = require('express')
const router = express.Router()

const Department = require('../models/department')

router.post('/add', (req, res) => {
  let newDepartment = new Department({
    name: req.body.name,
    office_number: req.body.office_number,
    manager_id: req.body.manager_id
  })

  Department.addDepartment(newDepartment, (err, department) => {
		if(err) {
			res.json({success: false, msg: err.message})
		} else {
			res.json({success: true, msg: "Department added."})
		}
	})
})

router.get('/:id', (req, res) => {
  Department.getDepartmentById(req.params.id, (err, department) => {
    if(err) {
      res.json({success: false, msg: "Department not found."})
    }
    if(department) {
      res.json({success: true, department})
    } else {
      res.json({success: false, msg: "Department not found."})
      return false
    }
  })
})

router.post('/:id/update', (req, res) => {
  let updatedDepartment = {
    name: req.body.name,
    office_number: req.body.office_number,
    manager_id: req.body.manager_id
  }

  if(updatedDepartment.name === '' || updatedDepartment.name == undefined) {
		res.json({success: false, msg: 'Name field is required.'})
		return false
	} else if(updatedDepartment.manager_id === '' || updatedDepartment.manager_id == undefined) {
    res.json({success: false, msg: 'Manager field is required.'})
    return false
  }

  Department.getDepartmentById(req.params.id, (err, department) => {
    if(err) {
      res.json({success: false, msg: "Department not found."})
      return false
    }
    if(department) {

      if(department.title === updatedDepartment.title) {
        Department.update({_id: department._id}, updatedDepartment, (err) => {
          if(err) {
            res.json({success: false, msg: err.message})
            return false
          } else {
            res.json({success: true, msg: `Department has been updated.`})
          }
        })
      } else {
        Department.update({_id: department._id}, updatedDepartment, (err) => {
          if(err) {
            res.json({success: false, msg: err.message})
            return false
          } else {
            res.json({success: true, msg: `Department has been updated.`})
          }
        })
      }
    } else {
      res.json({success: false, msg: "Department not found."})
      return false
    }
  })
})

router.delete('/:id/delete', (req, res) => {
  Department.getDepartmentById(req.params.id, (err, department) => {
    if(err) {
      res.json({success: false, msg: "Department not found."})
      return false
    }
    if(department) {
      let query = {_id:req.params.id}
      Department.remove(query, (err) => {
        if(err) {
          res.json({success: false, message: `There was a problem! Department has not been deleted`})
          return false
        }
        res.json({success: true, message: `Department has been deleted`})
      })
    } else {
      res.json({success: false, msg: "Department not found."})
      return false
    }
  })
})

module.exports = router
