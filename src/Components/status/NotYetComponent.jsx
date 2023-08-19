import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import TaskService from "../../services/TaskService";
import { useDispatch, useSelector } from "react-redux";
import {
    handleGetAllTask,
} from "../../redux/slices/TaskSlice";
import moment from 'moment';

export default function NotYetComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const access_token = localStorage.getItem("token")
    const getAllTask = useSelector((state) => state.tasks.data);
    const [isShowDeleted, setIsShowDeleted] = useState(false);
    const [id, setId] = useState(null);
    const [isShowStatus, setIsShowStatus] = useState(false)
    const [isShowStatusData, setIsShowStatusData] = useState(false)
    const [task, setTask] = useState({
        taskId: null,
        taskName: "",
        description: "",
        status: "",
        categoryId: null,
        date: "",
        category: {}
    })


    useEffect(() => {
        getAllTaskByStatus();
    }, [dispatch]);

    const getAllTaskByStatus = () => {
        TaskService.getAllTaskByStatus('is_cancelled', access_token)
            .then(
                (res) => {
                    if (res.data?.success) {
                        dispatch(handleGetAllTask(res.data.payload));
                    }
                },
                (err) => {
                    if (err.response.data.status == 400) {
                        dispatch(handleGetAllTask([]));
                    }
                }
            )
            .catch((error) => {
            });
    };

    const showTaskId = (id) => {
        setIsShowDeleted(true);
        setId(id);
    };

    const showTask = (data) => {
        setIsShowStatusData(true)
        if (isShowStatus) {
            setIsShowStatusData(false)
        }
        setTask(data)
    }

    const editTask = () => {
        navigate("/home/editTask", {
            state: { task }
        })

    }

    const handleDeleteTask = () => {
        TaskService.deleteTask(id, access_token).then((res) => {
            if (res.data?.success) {
                getAllTaskByStatus();;
                setIsShowDeleted(false);
            }
        });
    };

    const handleChangeTaskStatus = (taskId, taskStatus) => {
        TaskService.changeTaskStatus(taskId, taskStatus, access_token).then((res) => {
            if (res.data?.success) {
                getAllTaskByStatus();;
                setIsShowStatus(false)
            }
        }, (err) => {
            setIsShowStatus(false)
        });
    };
    return (
        <div className="mx-10">
            <div className="flex justify-between">
                <div>
                    <h1 className="capitalize font-bold text-3xl">All Your Boards</h1>
                </div>
                <div>
                    <Link to={"/home/addNewTask"}>
                        <button className="w-fulrounded-lg bg-primary text-white border-2 px-3 py-2 rounded-2xl font-poppins font-medium">
                            Add new task
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 border-1 rounded-[20px] mt-5">

                {getAllTask.length != 0 ? getAllTask.map((list) => (

                    <label key={list.taskId} onClick={() => showTask(list)} htmlFor="viewData" className=" right-3 top-3 cursor-pointer">
                        <div className={`pt-4 rounded-[20px] relative h-60 px-4 text-left shadow-sm
                         ${list.status == "is_completed"
                                ? "bg-bg_status_done"
                                : list.status == "is_in_progress"
                                    ? "bg-bg_status_progress"
                                    : list.status == "is_in_review"
                                        ? "bg-bg_status_review"
                                        : list.status == "is_cancelled"
                                            ? "bg-bg_status_not_yet"
                                            : ""}
                        `}>
                            <h1 className="capitalize text-lg font-bold text-white">
                                {moment(list.date).format("ddd, MMM D Y")}
                            </h1>
                            <label onClick={() => showTaskId(list.taskId)} htmlFor="delete" className="btn btn-sm btn-circle border-black bg-transparent text-black hover:bg-transparent absolute right-2 top-2">✕</label>
                            <div className="">
                                <h1 className="text-white font-bold line-clamp-1 text-xl mt-2 tracking-wide">
                                    {list.taskName}
                                </h1>
                            </div>

                            <div className="mt-3">
                                <span className="text-white text-base line-clamp-2">
                                    {list.description}
                                </span>
                            </div>

                            <div className="px-4 absolute inset-x-0 bottom-5">
                                <div className="dropdown">
                                    <button onClick={() => setIsShowStatus(true)} tabIndex={0} className="bg-bg_secondary p-1 px-5 m-1 capitalize rounded-xl">
                                        {list.status == "is_completed"
                                            ? "Done"
                                            : list.status == "is_in_progress"
                                                ? "In Progres"
                                                : list.status == "is_in_review"
                                                    ? "Review"
                                                    : list.status == "is_cancelled"
                                                        ? "Not yet"
                                                        : ""}
                                    </button>

                                    {isShowStatus ?
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>
                                                <a
                                                    onClick={() =>
                                                        handleChangeTaskStatus(
                                                            list.taskId,
                                                            "is_in_progress"
                                                        )
                                                    }
                                                >
                                                    In Progress
                                                </a>

                                                <a
                                                    onClick={() =>
                                                        handleChangeTaskStatus(list.taskId, "is_in_review")
                                                    }
                                                >
                                                    Review
                                                </a>

                                                <a
                                                    onClick={() =>
                                                        handleChangeTaskStatus(list.taskId, "is_completed")
                                                    }
                                                >
                                                    Done
                                                </a>

                                                <a
                                                    onClick={() =>
                                                        handleChangeTaskStatus(list.taskId, "is_cancelled")
                                                    }
                                                >
                                                    Not yet
                                                </a>
                                            </li>
                                        </ul>
                                        : null}

                                </div>
                            </div>
                        </div>

                    </label>

                ))
                    :
                    <div className="col-span-4 text-center flex justify-center items-center h-[70vh]">

                        <h2 className="text-4xl leading-tight font-bold text-primary">No Tasks Available</h2>
                    </div>
                }


            </div>
            {isShowDeleted ? (
                <>
                    <input
                        type="checkbox"
                        id="delete"
                        className="modal-toggle"
                    />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label for="delete" className="btn btn-sm btn-circle bg-transparent text-black hover:bg-transparent absolute right-2 top-2">✕</label>
                            <h3 className="font-bold text-lg">Logout!</h3>
                            <p className="py-4">
                                Are you sure, you want to logout?
                            </p>
                            <div className="modal-action">
                                <button
                                    className="btn bg-red-700 hover:bg-red-800 border-none"
                                    onClick={handleDeleteTask}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {isShowStatusData ?
                <>
                    <input
                        type="checkbox"
                        id="viewData"
                        className="modal-toggle"
                    />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {task.taskName}
                                    </h3>
                                </div>
                                <div>
                                    <span className="float-right font-bold text-lg text-red-700">
                                        {moment(task.date).format("ddd, MMM D Y")}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Category : {task.category?.categoryName}
                                    </h3>
                                </div>
                                <div>
                                    <span className="float-right font-bold text-lg text-red-700">
                                        {task.status == "is_completed"
                                            ? "Done"
                                            : task.status == "is_in_progress"
                                                ? "In Progres"
                                                : task.status == "is_in_review"
                                                    ? "Review"
                                                    : task.status == "is_cancelled"
                                                        ? "Not yet"
                                                        : ""}
                                    </span>
                                </div>
                                <hr className="w-full col-span-2 h-1 mx-auto bg-gray-300 border-0 rounded dark:bg-gray-700" />
                            </div>

                            <div>
                                <p className="py-4">
                                    {task.description}
                                </p>
                            </div>
                            <div className="modal-action">
                                <button
                                    onClick={() => editTask()}
                                    className="p-1 px-3 text-white font-medium border-none rounded-lg uppercase bg-primary">
                                    update
                                </button>
                                <label htmlFor="viewData" className="bg-gray-200 border-gray-700 00p-1 px-3 font-medium -800 border rounded-lg uppercase">
                                    close
                                </label>
                            </div>
                        </div>
                    </div>
                </>
                : null}

        </div>
    );
}
