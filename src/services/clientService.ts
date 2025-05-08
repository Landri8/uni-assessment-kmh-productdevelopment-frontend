import { FeedbackCreationFormData } from "../schemas/FeedbackCreationFormSchema";
import { MessageCreationFormData } from "../schemas/MessageCreationFormSchema";
import { getRequest, postRequest } from "./https";

const baseUrl = import.meta.env.VITE_API_URL;

export const sendMessageApi = (data: MessageCreationFormData) => {
    return postRequest(`${baseUrl}/app/messages`, data);
}

export const getEventListApi = () => {
    return getRequest(`${baseUrl}/app/events`);
}

export const getFeedbackListApi = () => {
    return getRequest(`${baseUrl}/app/feedbacks`);
}

export const getLastThreeFeedbackListApi = () => {
    return getRequest(`${baseUrl}/app/lastThreeFeedbacks`);
}

export const sendFeedbackApi = (body: FeedbackCreationFormData) => {
    return postRequest(`${baseUrl}/app/feedbacks`, body);
}

export const getVerficationCodeApi = (body: { email: string }) => {
    return postRequest(`${baseUrl}/app/otp/get`, body);
}

export const verifyEmailApi = (body: { email: string, otp: string }) => {
    return postRequest(`${baseUrl}/app/otp/verify`, body);
}
