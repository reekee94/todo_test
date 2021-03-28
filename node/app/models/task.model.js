const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        title: String,
        cat: { type: String, default: 'high' },
        content: String,
        completed: { type: Boolean, default: false },
        start_date: { type: Date, default: Date.now },
        due_date: Date,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = mongoose.model('Task', TaskSchema);
