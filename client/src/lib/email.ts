import { apiRequest } from "./queryClient";

export interface EmailDemoRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export async function sendDemoEmail(data: EmailDemoRequest) {
  return apiRequest("POST", "/api/email-demo", data);
}
