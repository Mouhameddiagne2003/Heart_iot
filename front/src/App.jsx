import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Enregistrement des composants Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MAX_ECG_POINTS = 300; // Par exemple, 100 points

const App = () => {
    const [sensorData, setSensorData] = useState([]);
    const [latestData, setLatestData] = useState({});
    const [patientInfo, setPatientInfo] = useState({});
    const [ecgData, setEcgData] = useState([]); // État pour accumuler les données ECG
    const [labels, setLabels] = useState([]); // État pour les labels du graphique

    // Fonction pour récupérer les données du patient
    const fetchPatientInfo = async () => {
        try {
            const result = await axios.get('http://backend:3000/api/patients/6684008ee1520388a96b3b1b'); // Remplacez par l'ID du patient et l'URL correcte
            setPatientInfo(result.data);
        } catch (error) {
            console.error('Error fetching patient info:', error);
        }
    };

    // Fonction pour récupérer les données médicales du patient
    const fetchMedicalData = async () => {
        try {
            const result = await axios.get('http://backend:3000/api/patients/6684008ee1520388a96b3b1b/medicalData'); // Remplacez par l'ID du patient et l'URL correcte
            setSensorData(result.data);
            const latest = result.data[result.data.length - 1]; // Prendre les dernières données de l'array

            setLatestData(latest);

            // Ajouter les nouvelles données ECG aux données existantes
            setEcgData(prevEcgData => {
                const newEcgData = [...prevEcgData, ...latest.ecg];
                if (newEcgData.length > MAX_ECG_POINTS) {
                    // Réinitialiser si la limite est atteinte
                    return latest.ecg;
                }
                return newEcgData;
            });

            // Générer des labels pour chaque point ECG basé sur le timestamp
            const newLabels = latest.ecg ? Array(latest.ecg.length).fill(new Date(latest.timestamp).toLocaleTimeString()) : [];
            setLabels(prevLabels => {
                const updatedLabels = [...prevLabels, ...newLabels];
                if (updatedLabels.length > MAX_ECG_POINTS) {
                    // Réinitialiser si la limite est atteinte
                    return newLabels;
                }
                return updatedLabels;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Effet pour charger les données initiales du patient et ses données médicales
    useEffect(() => {
        fetchPatientInfo();
        fetchMedicalData();
    }, []);

    // Effet pour mettre à jour les données médicales à intervalle régulier
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMedicalData();
        }, 1500); // Mettre à jour toutes les 2 secondes (ajustez selon vos besoins)

        return () => clearInterval(interval);
    }, []); // Vide le tableau de dépendances pour n'exécuter qu'une seule fois

    // Configuration des options pour le graphique
    // const options = {
    //     scales: {
    //         y: {
    //             beginAtZero: true,
    //             suggestedMax: 6000,
    //             stepSize: 1000,
    //             ticks: {
    //                 callback: function(value) {
    //                     return value; // Affiche les valeurs sans transformation
    //                 }
    //             }
    //         }
    //     }
    // };
    const options = {
        scales: {
            y: {
                min: 0,
                max: 6000,
                ticks: {
                    stepSize: 1000 // Intervalles de graduation
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };



    // Configuration des données pour le graphique
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'ECG',
                data: ecgData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 1, // Épaisseur de la ligne
                pointRadius: 0, // Taille des points (0 pour les enlever)
                fill: false,
            },
        ],
    };


    return (
        <div className="App container">
            <h1 className="text-center my-4">Heart Monitor</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-light mb-3">
                        <div className="card-header">Patient Info</div>
                        <div className="card-body">
                            <h5 className="card-title">Mouhamed DIAGNE</h5>
                            <p className="card-text">Age: 21 ans</p>
                            <p className="card-text">Address: Mamelles</p>
                            <p className="card-text">Contact: +221781958911</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card text-white bg-primary mb-3">
                                <div className="card-header">Temperature</div>
                                <div className="card-body">
                                    <h5 className="card-title">{latestData.temperature} °C</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-header">Humidity</div>
                                <div className="card-body">
                                    <h5 className="card-title">{latestData.humidity} %</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-header">Heart Rate</div>
                                <div className="card-body">
                                    <h5 className="card-title">{latestData.heartRate} BPM</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-header">SpO2</div>
                                <div className="card-body">
                                    <h5 className="card-title">{latestData.spo2} %</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card bg-light mb-3">
                        <div className="card-header">ECG Graph</div>
                        <div className="card-body">
                            <Line data={data} options={{options}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
