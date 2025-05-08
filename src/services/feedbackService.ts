import { UserCreationFormData } from "../schemas/UserCreationFormSchema";
import { UserUpdateFormData } from "../schemas/UserUpdateFormSchema";
import { getAuthRequest, postAuthRequest } from "./https";

const baseUrl = import.meta.env.VITE_API_URL;

export const getFeedbackListApi = () => {
    return getAuthRequest(`${baseUrl}/feedbacks`);
}

export const deleteFeedbackApi = (data: { id: string }) => {
    return postAuthRequest(`${baseUrl}/feedbacks/delete`, data);
}