/**
 * WordPress API utilities
 * This file will contain functions to fetch data from WordPress Headless CMS
 */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_AUTH_TOKEN = process.env.WORDPRESS_AUTH_TOKEN;

if (!WORDPRESS_API_URL) {
  console.warn('WORDPRESS_API_URL is not set in environment variables');
}

/**
 * Fetch data from WordPress API
 * @param endpoint - API endpoint (e.g., '/wp-json/wp/v2/posts')
 * @returns Promise with fetched data
 */
export async function fetchWordPressData<T>(endpoint: string): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error('WORDPRESS_API_URL is not configured');
  }

  const url = `${WORDPRESS_API_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (WORDPRESS_AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${WORDPRESS_AUTH_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.statusText}`);
  }

  return response.json();
}

