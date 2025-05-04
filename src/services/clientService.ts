import { MessageCreationFormData } from "../schemas/MessageCreationFormSchema";
import { postRequest } from "./https";

const baseUrl = import.meta.env.VITE_API_URL;

export const sendMessageApi = (data: MessageCreationFormData) => {
    return postRequest(`${baseUrl}/app/messages`, data);
}

export const getVerficationCodeApi = (body: { email: string }) => {
    return postRequest(`${baseUrl}/app/otp/get`, body);
}

export const verifyEmailApi = (body: { email: string, otp: string }) => {
    return postRequest(`${baseUrl}/app/otp/verify`, body);
}