// backend/gooeyService.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const GOOEY_API_URL = "https://api.gooey.ai/v2/SEOSummary/";

const payload = {
  "search_query": "ducati monster 696",
  "keywords": "ducati monster 696, 2009 ducati monster 696, ducati monster 696 for sale, ducati 696 monster for sale, 2012 ducati monster 696, ducati monster 696 2012, 2014 ducati monster 696, ducati 696 monster, ducati monster 696 top speed, ducati monster 696 price",
  "title": "motoworks chicago",
  "company_url": "https://www.motoworkschicago.com/"
};

export async function fetchSEOSummary() {
  try {
    const response = await fetch(GOOEY_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GOOEY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching SEO Summary:", error);
    throw error;
  }
}
