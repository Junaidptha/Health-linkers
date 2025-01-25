create database hospital;
use hospital;
CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    beds INT NOT NULL,
    oxygen_cylinders INT NOT NULL,
    doctors_available INT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    ayushman_assured VARCHAR(20) DEFAULT NULL
);


INSERT INTO hospitals (name, address, beds, oxygen_cylinders, doctors_available, latitude, longitude, ayushman_assured)
VALUES 
('Jaypee Hospital', 'Sector 128, Noida, Uttar Pradesh', 500, 300, 150, 28.4974, 77.3903, 'Ayushman_assured'),
('Fortis Hospital', 'B-22, Sector 62, Noida, Uttar Pradesh', 200, 120, 80, 28.6202, 77.3660, 'Not Assured'),
('Max Multi Speciality Hospital', 'A-364, Sector 19, Noida, Uttar Pradesh', 150, 100, 60, 28.5846, 77.3155, 'Ayushman_assured'),
('Sharda Hospital', 'Knowledge Park III, Greater Noida, Uttar Pradesh', 500, 350, 200, 28.4744, 77.5011, 'Ayushman_assured'),
('Yatharth Hospital', 'Omega I, Greater Noida, Uttar Pradesh', 300, 200, 120, 28.4515, 77.5208, 'Not Assured');

ALTER TABLE hospitals MODIFY COLUMN ayushman_assured VARCHAR(20) NOT NULL DEFAULT 'Not Assured';
UPDATE hospitals 
SET ayushman_assured = 'Not Assured' 
WHERE ayushman_assured IS NULL;

SELECT * FROM hospitals;

