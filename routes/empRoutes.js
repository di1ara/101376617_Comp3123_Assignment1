const express = require("express")
const routes = express.Router();
const employee = require("../models/Employee")

routes.get("/employees", async(req, res) =>{
    try{
        const empList = await employee.find();
        return res.status(200).json(empList);
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})

routes.post("/employees", async(req, res) =>{
    try{
        const newEmp = new employee(req.body);
        await newEmp.save();
        return res.status(201).json({ message: 'Employee created successfully'});
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})
//{eid}
routes.get("/employees/:eid", async(req, res) =>{
    try{
        const empId =  req.params.eid;
        const emp = await employee.findById(empId);
        if(!emp){
            return res.status(404).json({ message: 'Employee not found'});
        }
        return res.status(200).json(emp);
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})
//{eid}
routes.put("/employees/:eid", async(req, res) =>{
    try{
        const empId = req.params.eid;
        const updateData = req.body;

        const updateEmp = await employee.findByIdAndUpdate(
            empId,
            updateData,
            {new: true}
        );
        if(!updateEmp){
            return res.status(404).json({ message: 'Employee not found'});
        }
        return res.status(200).json({ message: 'Employee updated successfully', emp : updateEmp});
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})
//{eid}
routes.delete("/employees", async(req, res) =>{
    try{
        const empId = req.query.eid; 
        const empDelete = await employee.findByIdAndDelete(empId);

        if(!empDelete){
            return res.status(404).json({ message: 'Employee not found'});
        }

        return res.status(204).json();
    }catch(e){
        return res.status(400).json({ error: e.message });
    }
})
module.exports = routes;