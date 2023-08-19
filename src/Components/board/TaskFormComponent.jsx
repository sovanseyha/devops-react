import { Dropdown, Label, Select, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import list from "../../Images/list.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import TaskService from "../../services/TaskService";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from "../../services/CategoryService";
import { handleGetAllCategory } from "../../redux/slices/TaskSlice";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";

export default function TaskFormComponent() {

    const location = useLocation()
    const access_token = localStorage.getItem("token")
    const categories = useSelector((state) => state.tasks.categories)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { taskId, taskName, description, status, categoryId, date } = location.state?.task
        ? location.state.task
        : { taskId: null, taskName: "", description: "", status: "", categoryId: null, date: "" };

    const [newData, setNewData] = useState({
        taskId: taskId ?? null,
        taskName: taskName ?? "",
        description: description ?? "",
        status: status ?? "",
        categoryId: categoryId ?? null,
        date: date ? moment(date).format("YYYY-MM-DD") : ""
    });


    useEffect(() => {
        CategoryService.getAllCategoryForFilter(access_token).then((res) => {
            if (res.data?.payload) {
                dispatch(handleGetAllCategory(res.data.payload))
            }
        }, (err) => {
            dispatch(handleGetAllCategory([]))
        })
    }, [])

    const handleInputChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
        console.log(newData)
    };

    const handleSaveTask = () => {
        TaskService.saveTask(newData, access_token).then((res) => {
            if (res.data?.success) {
                navigate("/home/board")
            }
        }, (err) => {
        });
    };

    const handleUpdateTask = () => {
        TaskService.updateTask(newData.taskId, newData, access_token).then((res) => {
            if (res.data?.success) {
                navigate("/home/board")
            }
        }, (err) => {
        })
    }

    const formik = useFormik({
        initialValues: newData,
        validationSchema: Yup.object().shape(
            {
                date: Yup.string().required("Date is required"),
                taskName: Yup.string().required("Title is required"),
                categoryId: Yup.string().required("Category is required"),
                status: Yup.string().required("Status is required"),
                description: Yup.string().required("Description is required"),
            }
        ),
        onSubmit: () => {
            if (location.state != null) {
                handleUpdateTask()
            } else {
                handleSaveTask()
            }

            setNewData({
                taskName: "",
                description: "",
                status: "",
                categoryId: null,
                date: ""
            })
        },
    });

    return (
        <div className="mx-16">
            <div className="py-5">
                <span className="font-bold text-3xl">Add New Task</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 mb-6 md:grid-cols-4">
                    <div className="col-span-3">
                        <div className="grid gap-3 mb-6 md:grid-cols-3">
                            <div>
                                <label
                                    for="first_name"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                                >
                                    Date
                                </label>
                                <input
                                    name="date"
                                    type="date"
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.date}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                />
                                <div className="h-2 mb-2 mt-1">
                                    {formik.errors.date ? (
                                        <span className="block w-3/3 m-auto text-left mb-2 text-red-600 text-sm px-1">
                                            {formik.errors.date}
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                    Category
                                </label>
                                <Select
                                    name="categoryId"
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.categoryId}
                                >
                                    <option value="" hidden selected disabled> Choose Category </option>
                                    {categories.map(list => (
                                        <option value={list.categoryId} >{list.categoryName}</option>
                                    ))}
                                </Select>
                                <div className="h-2 mb-2 mt-1">
                                    {formik.errors.categoryId ? (
                                        <span className="block w-3/3 m-auto text-left mb-2 text-red-600 text-sm px-1">
                                            {formik.errors.categoryId}
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label
                                    for="last_name"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                                >
                                    Status
                                </label>
                                <Select
                                    name="status"
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.status}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose Status
                                    </option>
                                    <option value="is_in_progress">In Progress</option>
                                    <option value="is_in_review">Review</option>
                                    <option value="is_completed">Done</option>
                                    <option value="is_cancelled">Not yet</option>
                                </Select>
                                <div className="h-2 mb-2 mt-1">
                                    {formik.errors.status ? (
                                        <span className="block w-3/3 m-auto text-left mb-2 text-red-600 text-sm px-1">
                                            {formik.errors.status}
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            <div className="col-span-3 mt-6">
                                <label
                                    for="last_name"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                                >
                                    Title
                                </label>
                                <input
                                    name="taskName"
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.taskName}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="Web mini project 002"
                                />
                                <div className="h-2 mb-2 mt-1">
                                    {formik.errors.taskName ? (
                                        <span className="block w-3/3 m-auto text-left mb-2 text-red-600 text-sm px-1">
                                            {formik.errors.taskName}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>
                                <img className="w-[200px] h-[200px] ml-12" src={list} alt="" />
                            </span>
                        </div>
                    </div>
                </div>

                <div id="textarea" className="mb-6">
                    <div className="mb-2 block text-lg">
                        <label
                            for="last_name"
                            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                    </div>
                    <Textarea
                        name="description"
                        onInput={handleInputChange}
                        onChange={formik.handleChange}
                        value={newData.description}
                        placeholder="Your Discription here..."
                        rows="4"
                    />
                    <div className="h-2 mb-2 mt-1">
                        {formik.errors.description ? (
                            <span className="block w-3/3 m-auto text-left mb-2 text-red-600 text-sm px-1">
                                {formik.errors.description}
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="flex">
                    <div>
                        <button onClick={() => navigate("/home/board")}
                            type="submit"
                            className="text-black border border-gray-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="px-5">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-cente"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
