import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import CategoryService from '../../services/CategoryService';
import { handleGetAllCategory } from '../../redux/slices/CategorySlice';
import { BiDotsHorizontalRounded, BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";

export default function CategoryComponent() {

    const dispatch = useDispatch();
    const access_token = localStorage.getItem("token")
    const data = useSelector((state) => state.categories.data)
    const [isShowModal, setIsShowModal] = useState(false)
    const [categoryId, setCategoryId] = useState(null)
    const [isShowDeleted, setIsShowDeleted] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [newData, setNewData] = useState({
        categoryName: ""
    })

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleInputChange = (e) => {
        setNewData({ [e.target.name]: e.target.value })
    }

    const handleShowCategoryForUpdate = (data) => {
        setIsShowModal(true);
        setIsUpdate(true)
        setNewData({ categoryName: data.categoryName })
        setCategoryId(data.categoryId)
    }

    const getAllCategories = () => {
        CategoryService.getAllCategoryForFilter(access_token).then(res => {
            if (res.data) {
                dispatch(handleGetAllCategory(res.data.payload))
            }
        }, (err) => {
            if (err.response.data.status == 400) {
                dispatch(handleGetAllCategory([]))
            }
        }).catch((error) => {

        })
    }

    const handleSaveCategory = () => {
        CategoryService.saveData(newData, access_token)
            .then((res) => {
                if (res.data?.success) {
                    getAllCategories()
                }
            })
    }

    const handleDeleteCategory = () => {
        CategoryService.deleteData(categoryId, access_token)
            .then((res) => {
                if (res.data?.success) {
                    getAllCategories()
                    setIsShowDeleted(false)
                }
            })
    }

    const handleUpdateCategory = () => {
        CategoryService.updateData(categoryId, newData, access_token)
            .then((res) => {
                if (res.data?.success) {
                    getAllCategories()
                }
            })
    }

    const formik = useFormik({
        initialValues: newData,
        validationSchema: Yup.object().shape({
            categoryName: Yup.string()
                .required("Please enter categoryName"),
        }),
        onSubmit: () => {
            if (isUpdate) {
                handleUpdateCategory()
                setIsUpdate(false)
                setIsShowModal(false)
            } else {
                handleSaveCategory()
                setIsShowModal(false)
            }

            setNewData({ categoryName: "" })
        }
    });


    return (
        <div className='p-5 mt-[-18px]'>
            <div className='flex justify-between'>
                <div>
                    <h1 className="capitalize font-bold text-4xl">Categories</h1>
                </div>
            </div>


            <div className='flex content-start flex-wrap gap-2 text-black mt-5'>

                <div className='w-[250px] p-4 px-4 relative text-sm leading-6 bg-white rounded-md text-center h-[85px]'>
                    <p className='font-bold'>Create Category</p>
                    <label htmlFor="input" onClick={() => setIsShowModal(true)} className='' >
                        <span className='w-6 h-6 text-xl text-white bg-bg_primary text-center absolute top-12 left-[110px] rounded-full leading-5 font-bold cursor-pointer'>
                            +
                        </span>
                    </label>
                </div>

                {data.length != 0 ? data.map(list => (
                    <div className='' key={list.categoryId}>
                        <div className='w-[250px] shadow-md p-4 px-4 relative text-sm leading-6 bg-white rounded-md h-[85px] border-l-8 border-bg_primary'>
                            <h3 className="text-lg font-bold uppercase line-clamp-1 tracking-wide">
                                {list.categoryName}
                            </h3>
                            <p className="my-2 line-clamp-3">
                                {moment(list.date).format("ddd, MMM D Y")}
                            </p>
                            <div className='w-full flex flex-row flex-wrap justify-end gap-2 my-2 absolute top-0 left-0'>
                                <div className="dropdown ">
                                    <label tabIndex={0} className="btn btn-sm mx-3 bg-transparent text-black border-none hover:bg-transparent">
                                        <BiDotsHorizontalRounded className="w-5 h-5 text-gray-800 mr-[-9px] mt-3" />
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-3 shadow-md py-6 bg-white rounded-md w-52 text-center gap-2">
                                        <li className='focus:bg-transparent '><label htmlFor='input' className='border border-gray-700 font-medium flex justify-center' onClick={() => handleShowCategoryForUpdate(list)}><BiEdit className="w-5 h-5" />Edit</label></li>
                                        <li className='focus:bg-transparent '><label htmlFor='delete' className='border border-gray-700 text-red-700 flex justify-center' onClick={() => { setCategoryId(list.categoryId); setIsShowDeleted(true) }}><AiOutlineDelete className="w-5 h-5" />Delete</label></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : null}


                {isShowModal ? (
                    <>
                        <input type="checkbox" id="input" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative bg-gray-100 text-black p-0">
                                <div className='flex justify-between'>
                                    <div className='mt-3 mx-3'>
                                        <h3 className="mb-4 text-xl font-medium text-gray-900">
                                            {isUpdate ? "Update Category" : "Create Category"}
                                        </h3>
                                    </div>

                                    <div>
                                        <label htmlFor="input" id='cancelBtn' className="btn btn-sm btn-circle absolute right-2 top-3 bg-red-400 hover:bg-red-700 border-none">✕</label>
                                    </div>
                                </div>
                                <hr className="w-full col-span-2 mx-auto border-gray-400 rounde" />

                                <div>
                                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                        <div className='mx-3'>
                                            <label className="block mb-2 mt-5 text-base font-medium text-gray-900 dark:text-white">Category Name</label>
                                            <input onInput={handleInputChange} onChange={formik.handleChange} value={newData.categoryName} type="text" name="categoryName" className="rounded-xl border border-gray-300 focus:border-bg_primary bg-white input-bordered w-full" placeholder={`${isUpdate ? "Update Category" : "Create Category"}`} />
                                            <div className='h-2 mb-2 mt-1'>
                                                {formik.errors.categoryName ? <span className="block w-3/3 m-auto text-left mb-2 text-red-600 text-xs px-1" > {formik.errors.categoryName} </span> : null}
                                            </div>
                                        </div>
                                        <hr className="w-full h-1 col-span-2 mx-auto border-gray-400 rounde" />

                                        <div className='mx-3 pb-5'>
                                            <button type='submit' className='rounded-lg py-2 w-full border-1 bg-bg_primary text-white'>{isUpdate ? "Update" : "Create"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}

                {isShowDeleted ?
                    <>
                        <input type="checkbox" id="delete" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <label htmlFor="delete" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="font-bold text-lg">Logout!</h3>
                                <p className="py-4">Are you sure, you want to logout?</p>
                                <div className="modal-action">
                                    <button className="btn bg-red-700 border-none font-medium" onClick={handleDeleteCategory}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    null
                }

            </div>
        </div>
    )
}
