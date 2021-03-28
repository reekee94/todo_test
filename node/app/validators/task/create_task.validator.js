const Joi = require('@hapi/joi');
const customErrorMessages = require('./custom_error_messages');

module.exports = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .error(customErrorMessages.setTitleErrorMessages),
    cat: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .error(customErrorMessages.setCategoryErrorMessages),
    content: Joi.string()
      .trim()
      .min(5)
      .max(500)
      .required()
      .error(customErrorMessages.setContentErrorMessages
      ),
    completed: Joi.boolean().error(
        /* eslint-disable comma-dangle */
        customErrorMessages.setCompletedErrorMessages
    ),
    start_date: Joi.date().error(customErrorMessages.setStartDateErrorMessages),
    due_date: Joi.date()
        .required()
        .error(customErrorMessages.setDueDateErrorMessages),
});
