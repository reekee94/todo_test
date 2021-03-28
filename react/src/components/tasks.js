import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Paginate from './paginate';

const Tasks = (props) => {

    const {
        meta,
        onFilter,
        onChangeLimit,
        onPageChange,
        categoriesList,
        tasks,
        onEdit,
        onDelete,
        onCompletion
    } = props;

    // const ucfirst = (value) => {
    //     const v = String(value);
    //     return v[0].toUpperCase() + v.slice(1).toLowerCase();
    // }

    const fromNow = (value) => {
        return moment(value).fromNow();
    }

    const formatDate = (value) => {
        return moment(value).format('Do MMM YYYY');
    }

    const renderTasks = () => {

        if (tasks.length === 0) {
            return <p>No tasks available</p>;
    }
        return (
          <div className="table-container">
            <table className="table is-striped is-fullwidth is-narrow">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Created</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task._id}
                            className={task.completed ? 'is-selected' : ''}
                        >
                            <td>{task.title}</td>
                            <td>{task.cat}</td>
                            <td id={'content'}>{task.content}</td>
                            <td>{formatDate(task.start_date)}</td>
                            <td>{formatDate(task.due_date)}</td>
                            <td>{fromNow(task.created_at)}</td>
                            <td className="control-buttons">
                                <button
                                    type="button"
                                    className="button is-small is-info is-light"
                                    onClick={() => {
                                        onEdit(task);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="button is-small is-danger is-light"
                                    onClick={() => {
                                        onDelete(task);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="button is-small is-light is-success"
                                    onClick={() => {
                                        onCompletion(task);
                                    }}
                                >
                                    Mark as
                                    {` ${
                                        !task.completed
                                            ? 'complete'
                                            : 'incomplete'
                                    }`}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        );
    }

    return (
        <>
            <div className="data-controls">
                <select
                    onChange={(e) => {
                        onChangeLimit(e.target.value);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>

                <select
                  className="select is"
                  onChange={(e) => {
                      onFilter(e.target.value);
                  }}
                >
                    <option value={''}>All categories</option>
                    {categoriesList.map(cat =>
                        <option key={cat} value={cat}> {cat} </option> ) }
                </select>

            </div>
            {renderTasks()}
            {meta.total_pages > 1
                ? <Paginate meta={meta} onPageChange={onPageChange} />
                : null}
        </>
    );
}

Tasks.propTypes = {
    meta: PropTypes.objectOf(PropTypes.any).isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    categoriesList: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCompletion: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onChangeLimit: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Tasks;
