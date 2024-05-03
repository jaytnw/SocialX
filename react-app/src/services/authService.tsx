import { url } from "../utils/url";

export const authService = {
  login: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  logout: (navigateTo: (path: string) => void) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigateTo("/login");
  },
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
  refreshToken: async (navigateTo: (path: string) => void) => {
    try {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {

        authService.logout(navigateTo);
        return;
      }

      const response = await fetch(`${url.base_auth_url}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      })

      if (!response.ok) {
        authService.logout(navigateTo);
        throw new Error('Failed to refresh tokens');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
    } catch (error) {
      console.error('Error refreshing tokens:', error);
    }
  }

};
