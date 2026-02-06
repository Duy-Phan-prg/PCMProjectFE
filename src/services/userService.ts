import type {
  RegisterRequest,
  RegisterResponse,
  UserResponse,
} from "../types/User";
import type { ApiResponse } from "../types/ApiResponse";
import { apiUtils } from "../api/axios";
import { USER_URL } from "../constants/apiEndPoints";

/* ================= USER SERVICE ================= */

const userService = {

  /* ===== LOGIN ===== */
  async login(email: string, password: string): Promise<UserResponse> {
    try {
      const res = await apiUtils.post<ApiResponse<UserResponse>>(
        `${USER_URL}/login`,
        { email, password }
      );

      if (!res.data.payload) {
        throw new Error("Login failed");
      }

      return res.data.payload;

    } catch (error: any) {
      let message = "Đăng nhập thất bại";

      if (error.response?.data) {
        const data = error.response.data;
        message =
          data?.error?.details ||
          data?.message ||
          message;
      }

      throw new Error(message);
    }
  },

  /* ===== REGISTER ===== */
  async register(
    data: RegisterRequest
  ): Promise<RegisterResponse> {
    const res = await apiUtils.post<ApiResponse<RegisterResponse>>(
      `${USER_URL}/register`,
      data
    );

    if (!res.data.payload) {
      throw new Error("Register failed");
    }

    return res.data.payload;
  },
};

export default userService;
