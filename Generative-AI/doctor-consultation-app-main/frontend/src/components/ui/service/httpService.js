const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class HttpService {
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  getHeaders(auth = true) {
    if (auth) {
      return this.getAuthHeaders();
    }
    return { "Content-Type": "application/json" };
  }

  async makeRequest(endPoint, method, body, auth = true, options) {
    try {
      const url = `${BASE_URL}${endPoint}`;
      const headers = {
        ...this.getHeaders(auth),
        ...options?.headers,
      };

      const config = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      };

      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || `HTTP ${response.status}: ${response.statusText}`,
        );
      }
      return data;
    } catch (error) {
      console.error(`Api Error [${method} ${endPoint} ]:`, error);
      console.log(error);
      throw error;
    }
  }

  //Method with authentication
  async getWithAuth(endPoint, options) {
    return this.makeRequest(endPoint, "GET", null, true, options);
  }

  async postWithAuth(endPoint, body, options) {
    return this.makeRequest(endPoint, "POST", body, true, options);
  }

  async putWithAuth(endPoint, body, options) {
    return this.makeRequest(endPoint, "PUT", body, true, options);
  }

  async deleteWithAuth(endPoint, options) {
    return this.makeRequest(endPoint, "DELETE", null, true, options);
  }

  async postWithoutAuth(endPoint, body, options) {
    return this.makeRequest(endPoint, "POST", body, false, options);
  }

  async getWithoutAuth(endPoint, options) {
    return this.makeRequest(endPoint, "GET", null, false, options);
  }
}

//Export the singleton instance
export const httpService = new HttpService();

//bind create a new function where this is permanently set to the instance of HttpService

export const getWithAuth = httpService.getWithAuth.bind(httpService);
export const postWithAuth = httpService.postWithAuth.bind(httpService);
export const putWithAuth = httpService.putWithAuth.bind(httpService);
export const deleteWithAuth = httpService.deleteWithAuth.bind(httpService);

export const postWithoutAuth = httpService.postWithoutAuth.bind(httpService);
export const getWithoutAuth = httpService.getWithoutAuth.bind(httpService);
