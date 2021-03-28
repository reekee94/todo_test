import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Tasks from './tasks';
import TaskForm from './taskForm';

const Todo = () => {
    const [meta,setMeta] = useState({})
    const [task,setTask] = useState({
            title: '',
            cat: '',
            content: '',
            start_date: '',
            due_date: '',
    })
    const [tasks,setTasks] = useState([])
    const [categoriesList, setCategoriesList] = useState(['Filter'])
    const [errors,setErrors] = useState([])
    const [queryParams,setQueryParams] = useState({
            page: 1,
            perPage: 5,
            search: '',
        })

    useEffect( () => {
        getTasks();
    },[])

    const onEdit = (task) => {
        const taskToEdit = { ...task };
        taskToEdit.due_date = moment(task.due_date).format('YYYY-MM-DD');
        taskToEdit.start_date = moment(task.start_date).format('YYYY-MM-DD');

        setTask(taskToEdit)
    }

    const onDelete = (task)=> {
        if (!confirm('Are you sure?')) {
            return;
        }

        axios
            .delete(`tasks/${task._id}`)
            .then(() => {
               resetForm();
               getTasks();
            })
            .catch(({ response }) => {
                console.log(response);
            });
    }

    const onCompletion = (task) => {
        const taskToComplete = { ...task };
        taskToComplete.completed = !taskToComplete.completed;

        saveTask(taskToComplete);
    }

    const onFilter = (value) => {
        queryParams.search = value
        // setQueryParams({...queryParams, queryParams.search: value } )
        getTasks();
    }

    const onChangeLimit = (limit) => {
        queryParams.page = 1;
        queryParams.perPage = parseInt(limit, 10);
        //setQueryParams( {...queryParams, page:1, perPage: parseInt(limit, 10)} )
        //console.log(queryParams, "query")
        getTasks();
    }

    const onPageChange = (page) => {
        queryParams.page = parseInt(page, 10);
        setQueryParams(queryParams);

        getTasks();
    }

    const getTasks = () => {
        let url = 'tasks';
        const query = parseQueryParams();
        if (query) {
            url = `${url}?${query}`;
        }

        axios
            .get(url)
            .then(({ data }) => {
                setMeta( data.meta)
                setTasks(data.data)
                setCategoriesList(data.categoryList)
            })
            .catch((error) => console.log(error));
    }

    const resetForm = () => {
       setTask({
            title: '',
            cat: '',
            content: '',
            start_date: '',
            due_date: '',
       })
        setErrors([])
    }

    const saveTask = (task) => {
        const method = task._id ? 'PUT' : 'POST';
        const url = task._id ? `tasks/${task._id}` : 'tasks';

        axios({
            url,
            method,
            data: task,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                resetForm();
                getTasks();
            })
            .catch(({ response }) => {
                setErrors(response.data);
            });
    }

    const handleChange = (e =>
        setTask({...task, [e.target.name]: e.target.value }));


    const handleSubmit = (event) => {
        event.preventDefault();
        saveTask(task);
    }

    const parseQueryParams = () => {
        let output = '';
        for (const [key, value] of Object.entries(queryParams)) {
            if (value) {
                output += output ? `&${key}=${value}` : `${key}=${value}`;
            }
        }
        return output;
    }

        return (
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column is-one-third">
                        <h1>Create / Update Task</h1>
                        <TaskForm
                          categoriesList={categoriesList}
                            task={task}
                            errors={errors}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                    <div className="column">
                        <h1>Tasks</h1>
                        <Tasks
                            categoriesList={categoriesList}
                            meta={meta}
                            tasks={tasks}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onCompletion={onCompletion}
                            onFilter={onFilter}
                            onChangeLimit={onChangeLimit}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        );

}
export default Todo
