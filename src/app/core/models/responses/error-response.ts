export type ValidationError = {
    field: string;
    message: string;
};

export type ErrorResponse = {
    status: number;
    title: string;
    details: string;
    errors?: ValidationError[];
};
