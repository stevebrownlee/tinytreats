// Using relative URLs to work with the Vite proxy
const API_URL = '';

// Generic GET request
export async function fetchData(endpoint) {
  const response = await fetch(`/${endpoint}`, {
    credentials: 'include', // Important for cookie-based auth
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  return response.json();
}

// Generic POST request
export async function postData(endpoint, data) {
  const response = await fetch(`/${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  if (response.status === 204) {
    return null; // No content
  }

  return response.json().catch(() => null);
}

// Generic PUT request
export async function putData(endpoint, data) {
  const response = await fetch(`/${endpoint}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  if (response.status === 204) {
    return null; // No content
  }

  return response.json().catch(() => null);
}

// Generic PATCH request
export async function patchData(endpoint, data) {
  const response = await fetch(`/${endpoint}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  if (response.status === 204) {
    return null; // No content
  }

  return response.json().catch(() => null);
}

// Generic DELETE request
export async function deleteData(endpoint) {
  const response = await fetch(`/${endpoint}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  return null;
}

// Auth-specific services
export const authService = {
  async register(userData) {
    return postData('auth/register', userData);
  },

  async login(email, password) {
    return postData('auth/login', { email, password });
  },

  async logout() {
    return postData('auth/logout', {});
  },

  async getCurrentUser() {
    try {
      return await fetchData('auth/me');
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  async getUserRoles(email) {
    try {
      return await fetchData(`users/${email}/roles`);
    } catch (error) {
      console.error('Failed to get user roles:', error);
      return [];
    }
  }
};

// Product-specific services
export const productService = {
  async getAllProducts() {
    return fetchData('products');
  },

  async getProductById(id) {
    return fetchData(`products/${id}`);
  }
};

// Order-specific services
export const orderService = {
  async getAllOrders() {
    return fetchData('orders');
  },

  async createOrder(orderData) {
    return postData('orders', orderData);
  },

  async updateOrderStatus(id, newStatus) {
    return patchData(`order/${id}/status`, newStatus);
  }
};