const SensorData = require('../models/SensorData');
const Patient = require('../models/Patient');

exports.createSensorData = async (data) => {
    try {
        const { temperature, humidity, ecg, patientId } = data;
        const patient = await Patient.findById(patientId);

        if (patient) {
            const newData = new SensorData({
                temperature,
                humidity,
                ecg,
                patient: patient._id
            });

            await newData.save();

            patient.medicalData.push(newData);
            await patient.save();

            console.log('Data saved:', newData);
        } else {
            console.error('Patient not found:', patientId);
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
};
