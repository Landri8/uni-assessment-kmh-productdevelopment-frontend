import { EventCreationFormData } from "../schemas/EventCreationFormSchema";
import { EventUpdateFormData } from "../schemas/EventUpdateFormSchema";
import { getAuthRequest, postAuthRequest } from "./https";

const baseUrl = import.meta.env.VITE_API_URL;

export const createEventApi = (data: EventCreationFormData) => {
    return postAuthRequest(`${baseUrl}/events/create`, data);
}

export const getEventListApi = () => {
    return getAuthRequest(`${baseUrl}/events`);
}

export const getEventDetailsApi = (id: string) => {
    return getAuthRequest(`${baseUrl}/events/${id}`);
}

export const updateEventApi = (data: EventUpdateFormData) => {
    return postAuthRequest(`${baseUrl}/events/update`, data);
}

export const deleteEventApi = (data: { id: string }) => {
    return postAuthRequest(`${baseUrl}/events/delete`, data);
}