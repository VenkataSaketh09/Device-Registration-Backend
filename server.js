const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());  // middleware for the cors middleware
app.use(express.json());

const port = 5000;

mongoose.connect('mongodb://localhost:27017/device-registration-details')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection Error:', err));

const deviceSchema = new mongoose.Schema({
    deviceName: String,
    deviceIp: String,
    password: String, 
}, { collection: 'devices' });

const Device = mongoose.model('Device', deviceSchema);

app.post('/add_device', async (req, res) => { 
    const { deviceName, deviceIp, password } = req.body;
    const saltRounds = 8; 

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // console.log('Hashed Password:', hashedPassword); 

        await new Device({ deviceName, deviceIp, password: hashedPassword }).save();
        res.status(200).send('Data Saved Successfully');

    } catch (err) {
        console.error('Error in Saving the Data:', err);
        res.status(500).send('Failed to Save Data');
    }
});


app.get('/devices',async(req,res)=>{
    try{
        const devices=await Device.find({});
        res.status(200).json(devices);
    }catch(err){
        console.error('Error in Fetching Data:',err);
        res.status(500).send('Error in Fetching Data');
    }
})

app.post('/check_availability',async(req,res)=>{
    const {deviceId,password}=req.body;
    try{
        const device=await Device.findById(deviceId);
        if(!device){
            return res.status(404).json({message:"Device Not Found"});
        }
        const isMatch=await bcrypt.compare(password,device.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Password"});
        }

        const randomNumber=Math.floor(Math.random()*100);
        const isReachable=randomNumber%2===0?'Reachable':'Not Reachable';
        res.status(200).json({message:isReachable});

    }catch(err){
        console.log('Error checking Availability',err);
        res.status(500).json({message:'Error in Checking the Device Availability'});
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`));
