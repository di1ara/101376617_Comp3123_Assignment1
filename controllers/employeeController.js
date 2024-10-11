const Employee = require('../models/Employee');

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve employees.' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve employee.' });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully.', employee_id: newEmployee._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee.' });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found.' });
    res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee.' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteMany();
    res.status(200).json({ message: 'All employees deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employees.' });
  }
};
