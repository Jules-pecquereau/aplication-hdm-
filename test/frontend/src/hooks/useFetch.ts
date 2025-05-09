export default function useFetch() {
  const callApi = async (method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH', route: string, data?: Record<string, any>) => {
    try {
      const myHeaders = new Headers();
      myHeaders.set('Accept', 'application/json');
      myHeaders.set('Content-Type', 'application/json');

      const requestOptions = {
        method,
        headers: myHeaders,
        ...(data ? { body: JSON.stringify(data) } : {}),
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${route}`, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur API : ${response.status} - ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json(); // Retourne les données JSON
      }

      return null; // Retourne `null` si la réponse est vide
    } catch (error) {
      console.error('Erreur dans callApi :', error);
      throw error;
    }
  };

  return {
    get: (route: string) => callApi('GET', route),
    post: (route: string, data: Record<string, any>) => callApi('POST', route, data),
    put: (route: string, data: Record<string, any>) => callApi('PUT', route, data),
    patch: (route: string, data: Record<string, any>) => callApi('PATCH', route, data),
    delete: (route: string, data?: Record<string, any>) => callApi('DELETE', route, data),
  }
}
