// API para leer archivos TXT
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Obtener el nombre del archivo desde la query
    const { file } = req.query;
    
    if (!file) {
      return res.status(400).json({ error: 'File parameter is required' });
    }
    
    // Ruta del archivo (asumiendo que está en la raíz del proyecto)
    const filePath = join(process.cwd(), `${file}.txt`);
    
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      
      res.status(200).json({
        success: true,
        filename: `${file}.txt`,
        content: fileContent,
        lines: fileContent.split('\n')
      });
      
    } catch (fileError) {
      res.status(404).json({
        success: false,
        error: 'File not found',
        filename: `${file}.txt`
      });
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}