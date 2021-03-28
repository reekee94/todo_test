const Joi = require('@hapi/joi');
const customErrorMessages = require('./custom_error_messages');

module.exports = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .error(customErrorMessages.setTitleErrorMessages),
    cat: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .error(customErrorMessages.setCategoryErrorMessages),
    completed: Joi.boolean().error(
        /* eslint-disable comma-dangle */
        customErrorMessages.setCompletedErrorMessages
    ),
    content: Joi.string()
      .trim()
      .min(5)
      .max(500)
      .error(customErrorMessages.setContentErrorMessages
      ),
    start_date: Joi.date().error(customErrorMessages.setStartDateErrorMessages),
    due_date: Joi.date().error(customErrorMessages.setDueDateErrorMessages),
});
