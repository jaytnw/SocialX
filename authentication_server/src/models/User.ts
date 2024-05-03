
interface User {
    userId: string;
    email: string;
    fullname?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    updateAt: Date;
    createAt: Date;
  }
  
  export default User;
  