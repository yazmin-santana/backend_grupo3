import fs from 'fs';
import path from 'path';

// Función para leer archivos JSON de una carpeta específica
const readJSONFiles = (folderPath) => {
    const files = fs.readdirSync(folderPath);
    const jsonFiles = files.filter(file => file.endsWith('.json')); // Filtra solo archivos .json
    return jsonFiles.map(file => {
        const filePath = path.join(folderPath, file);
        const data = fs.readFileSync(filePath, 'utf-8'); // Lee el contenido
        return JSON.parse(data); // Convierte el contenido a objeto JS
    });
};

// Función para leer datos organizados por categorías
export const readDataFromCategories = (baseFolder) => {
    const categories = fs.readdirSync(baseFolder); // Obtiene las subcarpetas
    const data = {};
    categories.forEach(category => {
        const categoryPath = path.join(baseFolder, category);
        if (fs.lstatSync(categoryPath).isDirectory()) { // Verifica si es una carpeta
            data[category] = readJSONFiles(categoryPath);
        }
    });
    return data;
};

