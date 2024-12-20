import React, { useEffect, useState } from 'react';
import './VehicleAndMaintenanceRecords.css';

// main function to fetch and display data from the maintenance table 
const MaintenanceRecords = ({ maintenanceRecords, setMaintenanceRecords, setError, vehicles }) => {
    // local state to handle loading and error
    const [isLoading, setIsLoading] = useState(true);

    // fetch maintenance records when the component mounts
    useEffect(() => {
        fetchMaintenanceRecords();
    }, []); 

    const fetchMaintenanceRecords = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError('No access token found.');
            setIsLoading(false);
            return;
        }
        // set the url to local or prod based on the environment dynamically
        const baseUrl = process.env.NODE_ENV === 'production'
            ? 'http://vehicle-service-lb-893946001.us-east-1.elb.amazonaws.com'
            : 'http://localhost:5000';

        try {
            const response = await fetch(`${baseUrl}/maintenance`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch maintenance records.');
            }

            const data = await response.json();

            if (data && data.items) {
                setMaintenanceRecords(data.items); 
            } else {
                setError('⏳');
            }
        } catch (error) {
            console.error('Error fetching maintenance records:', error);
            setError('Error fetching maintenance records.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        //html compoenent to display maintenance records
        <div>
            <h2>Maintenance Records</h2>

            {isLoading ? (
                <table className="records-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Maintenance Type</th>
                            <th>Mileage</th>
                            <th>Last Service Date</th>
                            <th>Next Service Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            ) : (
                <table className="records-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Maintenance Type</th>
                            <th>Mileage</th>
                            <th>Last Service Date</th>
                            <th>Next Service Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceRecords.length > 0 ? (
                            maintenanceRecords.map((record) => {
                                // Find the vehicle associated with the maintenance record
                                const vehicle = vehicles.find((v) => v.vehicle_id === record.vehicle_id);
                                const vehicleDisplayName = vehicle
                                    ? `${vehicle.make} ${vehicle.model} ${vehicle.year}`
                                    : 'Unknown Vehicle';

                                return (
                                    <tr key={record.maintenance_id}>
                                        <td>{vehicleDisplayName}</td>
                                        <td>{record.maintenance_type}</td>
                                        <td>{record.mileage}</td>
                                        <td>{record.last_service_date}</td>
                                        <td>{record.next_service_date}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5">vehicle-service-scheduler/src/components/VehicleRecords.js</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MaintenanceRecords;
