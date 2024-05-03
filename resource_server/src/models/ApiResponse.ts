interface IApiResponse {
    message: string;
    status: string;
    data: any[];
    accessToken?: string; 
    refreshToken?: string; 
  }
  
  export class ApiResponse implements IApiResponse {
    message: string;
    status: string;
    data: any[];
    accessToken?: string; 
    refreshToken?: string; 
  
    constructor(
      message: string,
      status: string,
      data: any[] = [],
      accessToken?: string,
      refreshToken?: string
    ) {
      this.message = message;
      this.status = status;
      this.data = data;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }
  }
  