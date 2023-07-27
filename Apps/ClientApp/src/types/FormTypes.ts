export interface FormField {
    value: string,
    error: string,
}

export interface FormFields {
    [field: string]: FormField,
}

export interface FormPayload {
    [field: string]: string,
}

export const INIT_FIELD_STATE = {
    value: '',
    error: '',
};