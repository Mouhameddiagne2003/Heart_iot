const mqtt = require('mqtt');
const SensorData = require('../models/SensorData');
const Patient = require('../models/Patient');
const sensorDataController = require('../controllers/sensorDataController');


// import { initIO } from "../server"


const mqttClient = mqtt.connect('mqtt://192.168.50.30');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT Broker');
    mqttClient.subscribe('health/monitor');
});

mqttClient.on('message', async (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        const { temperature, humidity, ecg, heartRate, spo2, patientId, timestamp } = data;


        const patient = await Patient.findById(patientId);

        if (patient) {
            const newData = new SensorData({
                temperature,
                humidity,
                ecg,
                heartRate,
                spo2,
                timestamp: timestamp || Date.now(),
                patient: patient._id
            });

            await newData.save();

            patient.medicalData.push(newData);
            await patient.save();

            console.log('Data saved:', newData);
            // Émission des données mises à jour au frontend via Socket.io
            // const io = initIO(); // Obtenez l'instance de Socket.io initialisée

        } else {
            console.error('Patient not found:', patientId);
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
});


module.exports = {
    mqttClient
};
