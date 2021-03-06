export const ERRORS = {
    GENERIC: 'generic',
    AUTHENTICATION: {
        AUTHENTICATION_REQUIRED: 'authentication.authentication_required',
        AUTHENTICATION_INVALID: 'authentication.authentication_invalid'
    },
    USER_INPUT: {
        GENERIC: 'user_input.generic',
        USER_NOT_FOUND: 'user_input.user_not_found',
        USER_ALREADY_EXISTS: 'user_input.user_already_exists',
        INCORRECT_PASSWORD: 'user_input.incorrect_password',
    },
    SERVER_ERROR: {
        GENERIC: 'server_error.generic',
        FAILED_SAVING_MODEL: 'server_error.failed_saving_model',
    }
}