export interface FeedbackModel {
    id: string;
    name: string;
    role: string;
    company: string;
    rating: number;
    createdAt: string;
};

interface FeedbackInfoModel extends FeedbackModel {
    feedback: string
}

export default FeedbackInfoModel