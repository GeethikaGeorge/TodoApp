
// src/controllers/suggestController.ts
import axios from 'axios';
import { Request, Response } from 'express';


const HF_API_TOKEN = process.env.HF_API_TOKEN!;
const HF_MODEL_URL = process.env.HF_MODEL_URL!;
// console.log('HF_API_TOKEN:', HF_API_TOKEN);
// console.log('HF_MODEL_URL:', HF_MODEL_URL);


export const suggestTasks = async (req: Request, res: Response) => {
  const { context } = req.body;

  //const prompt = `Suggest 3 productive tasks for the following context: "${context}"`;
  const prompt = `Suggest 5 simple, productive tasks that can be done in a short time.'`;

  try {
    const response = await axios.post(
      HF_MODEL_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
        },
      }
    );

    const outputText = response.data[0]?.generated_text || '';
    
    const suggestions = outputText
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.replace(/^\d+[\.\)]?\s*/, '')); // remove "1. ", "2) " etc

    res.json({ suggestions });
  } catch (error) {
    console.error('Hugging Face API error:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions from Hugging Face API' });
  }
};
