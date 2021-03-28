const setTitleErrorMessages = (errors) => {
    errors.forEach((error) => {
        let message = '';

        switch (error.code) {
            case 'string.min': {
                message = `Title must be a minimum of ${error.local.limit} characters`;

                error.message = message;
                break;
            }

            case 'string.max': {
                message = `Title must be less than or equal to ${error.local.limit} characters`;

                error.message = message;
                break;
            }

            case 'string.empty':
            case 'any.required': {
                error.message = 'Title is required';
                break;
            }
        }
    });

    return errors;
};

const setCategoryErrorMessages = (errors) => {
    errors.forEach((error) => {
        switch (error.code) {
            case 'any.only': {
                error.message = 'Category must either be min 3 and max 50 symbols';
                break;
            }

            case 'any.required': {
                error.message = 'Category is required';
                break;
            }
        }
    });

    return errors;
};

const setCompletedErrorMessages = (errors) => {
    errors.forEach((error) => {
        switch (error.code) {
            case 'any.only':
            case 'boolean.base': {
                error.message = 'Completed must either be true or false';
                break;
            }

            case 'any.required': {
                error.message = 'Completed is required';
                break;
            }
        }
    });

    return errors;
};

const setContentErrorMessages = (errors) => {
    let message = ''
    errors.forEach((error) => {
        switch (error.code) {
            case 'string.min': {
                message = `Note content must be a minimum of ${error.local.limit} characters`;

                error.message = message;
                break;
            }

            case 'string.max': {
                message = `Note content must be less than or equal to ${error.local.limit} characters`;

                error.message = message;
                break;
            }

            case 'string.empty':
            case 'any.required': {
                error.message = 'Content is required';
                break;
            }
        }
    })
    return errors
}

const setStartDateErrorMessages = (errors) => {
    errors.forEach((error) => {
        switch (error.code) {
            case 'date.base': {
                error.message = 'Start date must be a valid date';
                break;
            }

            case 'any.required': {
                error.message = 'Start date is required';
                break;
            }
        }
    });

    return errors;
};

const setDueDateErrorMessages = (errors) => {
    errors.forEach((error) => {
        switch (error.code) {
            case 'date.base': {
                error.message = 'Due date must be a valid date';
                break;
            }

            case 'any.required': {
                error.message = 'Due date is required';
                break;
            }
        }
    });

    return errors;
};

module.exports = {
    setTitleErrorMessages,
    setCompletedErrorMessages,
    setCategoryErrorMessages,
    setContentErrorMessages,
    setStartDateErrorMessages,
    setDueDateErrorMessages,
};
