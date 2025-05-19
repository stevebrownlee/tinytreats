// Using relative URLs to work with the Vite proxy
const API_URL = '';

// Generic GET request
export async function fetchData(endpoint) {
  // Ensure endpoint doesn't start with a slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

  console.log(`Fetching from endpoint: /${cleanEndpoint}`);

  const response = await fetch(`/${cleanEndpoint}`, {
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
  },

  // Get all users with their roles
  async getAllUsers() {
    try {
      // First get all users from the auth/users endpoint
      console.log('Fetching users from auth/users endpoint');
      const users = await fetchData('auth/users');


      // For each user, get their roles
      const usersWithRoles = await Promise.all(
        users.map(async (user) => {
          const roles = await this.getUserRoles(user.email);
          return { ...user, roles };
        })
      );

      return usersWithRoles;
    } catch (error) {
      console.error('Failed to get all users:', error);
      return []; // Return empty array instead of throwing
    }
  },

  // Get all available roles
  async getAllRoles() {
    try {
      return await fetchData('roles');
    } catch (error) {
      console.error('Failed to get roles:', error);
      throw error;
    }
  },

  // Add a role to a user
  async addRoleToUser(email, roleName) {
    try {
      return await postData('users/roles', { email, roleName });
    } catch (error) {
      console.error(`Failed to add role ${roleName} to user ${email}:`, error);
      throw error;
    }
  },

  // Remove a role from a user
  async removeRoleFromUser(email, roleName) {
    try {
      return await deleteData(`users/${email}/roles/${roleName}`);
    } catch (error) {
      console.error(`Failed to remove role ${roleName} from user ${email}:`, error);
      throw error;
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
  },

  async createProduct(productData) {
    return postData('products', productData);
  },

  async deleteProduct(id) {
    return deleteData(`products/${id}`);
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
    return patchData(`orders/${id}/status`, { status: newStatus });
  }
};