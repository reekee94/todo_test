import React from 'react';
import PropTypes from 'prop-types';

const TaskForm = (props) => {

    const { task, onChange, onSubmit, categoriesList, errors } = props;

    const getError = (field) => {
        const error = errors.find((e) => e[field]);
        if (error) {
            return error[field];
        }

        return null;
    }

    const hasError = (field) => {
        return errors.some((error) => error[field]);
    }

    const displayError = (field) => {
        if (!hasError(field)) {
            return null;
        }

        return <p className="help is-danger">{getError(field)}</p>;
    }

    return (
        <form autoComplete="off" onSubmit={onSubmit}>
            <div className="field">
                <label className="label" htmlFor="title">
                    Task / Title
                </label>
                <div className="control">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Task"
                        value={task.title}
                        onChange={onChange}
                        className={`input${
                            hasError('title') ? ' is-danger' : ''
                        }`}
                    />
                    {displayError('title')}
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="category">
                    Category
                </label>
                <div className="control">
                    <div
                        className={`select is-fullwidth${
                            hasError('priority') ? ' is-danger' : ''
                        }`}
                    >
                        <input
                          className={'input'}
                          name={'cat'}
                          id={'cat'}
                          value={task.cat}
                          type="input"
                          list="optionsList"
                          onChange={onChange}
                          placeholder="Chose or create a category"
                    />
                        <datalist id="optionsList">
                            {categoriesList.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                        </datalist>

                    </div>
                    {displayError('cat')}
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="title">
                    Content
                </label>
                <div className="control">
                    <input
                      type="text"
                      id="content"
                      name="content"
                      placeholder="Write some details about your task"
                      value={task.content}
                      onChange={onChange}
                      className={`input${
                        hasError('content') ? ' is-danger' : ''
                      }`}
                    />
                    {displayError('content')}
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="start_date">
                    Start Date
                </label>
                <div className="control">
                    <input
                        type="text"
                        id="start_date"
                        name="start_date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        placeholder="YYYY-MM-DD"
                        value={task.start_date}
                        onChange={onChange}
                        className={`input${
                            hasError('start_date') ? ' is-danger' : ''
                        }`}
                    />
                    {displayError('start_date')}
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="due_date">
                    Due Date
                </label>
                <div className="control">
                    <input
                        type="text"
                        id="due_date"
                        name="due_date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        placeholder="YYYY-MM-DD"
                        value={task.due_date}
                        onChange={onChange}
                        className={`input${
                            hasError('due_date') ? ' is-danger' : ''
                        }`}
                    />
                    {displayError('due_date')}
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-link">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

TaskForm.propTypes = {
    task: PropTypes.objectOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    categoriesList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
