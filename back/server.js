const express = require('express');
const connectDB = require('./config/db');
const medecinRoutes = require('./routes/medecinRoutes');
const patientRoutes = require('./routes/patientRoutes');
const SensorDataRoutes = require('./routes/sensordataRoutes');
const { mqttClient} = require('./mqtt/mqttClient');
const cors = require('cors'); // Ajoutez cette ligne
const sensorDataRoutes = require('./routes/sensorDataRoutes');


const app = express();
const port = 3000;



// Middleware
app.use(cors()); // Ajoutez CORS ici
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Initialisation du client MQTT
mqttClient.on('connect', () => {
    console.log('MQTT Client Connected');
});



// Routes
app.use('/api/medecins', medecinRoutes);
app.use('/api/patients', patientRoutes);
// Routes pour les données de capteur
app.use('/api/sensorData', sensorDataRoutes);

// Exposez la fonction initIO pour être utilisée ailleurs




// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
