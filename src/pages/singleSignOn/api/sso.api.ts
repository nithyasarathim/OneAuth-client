import api from "../../utils/axios";

interface SSOAuthorizeParams {
  client_id: string;
  redirect_uri: string;
  state: string;
}

interface SSOAuthorizeResponse {
  success: boolean;
  authCode?: string;
  expiresIn?: number;
  state?: string;
  message: string;
}

const authorizeSSO = async ({
  client_id,
  redirect_uri,
  state,
}: SSOAuthorizeParams): Promise<SSOAuthorizeResponse> => {
  try {
    const res = await api.get("/sso/authorize", {
      params: { client_id, redirect_uri, state },
    });
    const { auth_code, expires_in, message } = res.data.data;
    return {
      success: true,
      authCode: auth_code,
      expiresIn: expires_in,
      state,
      message: message || "Authorization granted",
    };
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || "SSO authorization failed";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export { authorizeSSO };
