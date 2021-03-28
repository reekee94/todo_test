const objectIsEmpty = (obj) => Object.keys(obj).length === 0;

const escapeRegex = (string) => {
    const re = /[-[\]{}()*+?.,\\^$|#\s]/g;
    return string.replace(re, '\\$&');
};

const formatValidationErrors = (validationErrorObject) => {
    const errors = [];
    validationErrorObject.details.forEach((validationError) => {
        const { label } = validationError.context;
        // check if an error with matching validation error label
        // already exists in the current errors to be returned

        const check = errors.find(
            (error) => Object.keys(error).indexOf(label) !== -1
        );

        // If validation message belonging to the current label does not
        // already exist in current array of errors to be returned
        // add it, otherwise ignore
        if (!check) {
            const temp = {};
            temp[label] = validationError.message.replace(/"/g, '');

            errors.push(temp);
        }
    });

    return errors;
};

const generatePaginationMeta = (page, perPage, totalCount) => {
    const totalPages = Math.ceil(totalCount / perPage);

    return {
        last_page: totalPages,
        total_pages: totalPages,
        current_page: page,
        previous_page: !(page - 1 < 1) ? page - 1 : null,
        next_page: page + 1 <= totalPages ? page + 1 : null,
        has_previous: page - 1 >= 1,
        has_next: page + 1 <= totalPages,
    };
};

module.exports = {
    escapeRegex,
    objectIsEmpty,
    formatValidationErrors,
    generatePaginationMeta,
};
