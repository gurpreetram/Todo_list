import axios from 'axios'
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = () => {

    const [todos, setTodos] = useState([]);
    const [activate, setActivate] = useState(false);
    const [task, setTask] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [completedTime, setCompletedTime] = useState(new Date())


    // const handleChange = (e) => {
    //     e.preventDefault()
    //     setTodos(e.target.value)
    // }
    // console.log(`Coming from onChange ${todos}`);//

    useEffect(() => {
        axios.get('http://localhost:8080/get').then(response => setTodos(response.data))
            .catch(err => console.log(err))
    }, [])



    const handlesubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/connection', { task, age, email }).then(response => { location.reload() })
            .catch(err => console.log(err))
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:8080/userdelete/' + id).then(response => { location.reload() })
            .catch(err => console.log(err))
    }

    // const handleComplete = (index) =>{
    //     let now = new Date();
    //     let date = now.getDate();
    //     let month = now.getMonth();
    //     let year = now.getFullYear();
    //     let hour = now.getHours();
    //     let minute = now.getMinutes();
    //     let second = now.getSeconds();
    //     let  completedOn = date + "/" + month + '/' + year + '/' + 'at' + hour + ':' + minute + ":" + second;
    //     setCompletedTodos(completedOn);

    // }

    const handleComplete = () => {
        // const currentDate = new Date().toLocaleDateString(); 
        // setCompletedTime(currentDate); 
        // setInterval( ()=> setCompletedTime(new Date()),1000)
        // const currDate = new Date().toLocaleDateString(); 
        setCompletedTime(new Date().toLocaleDateString())
    }




    return (
        <>
            <div className="  flex flex-col  items-center  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full overflow-hidden h-screen">

                <div className="mt-14 p-14 bg-blue-950 rounded-lg">
                    <h1 className=" font-semibold text-4xl tracking-wide text-center mb-16 text-yellow-100 ">TodoList</h1>
                    <div className='sm:block'>
                        <div className='md:flex'>
                            <div>
                                <p className='text-white mb-3 text-base'>Title</p>
                                <input type="text" placeholder="Add Something to your list!" onChange={(e) => { setTask(e.target.value) }}
                                    className="w-96 py-2 p-2 border-violet-700 border rounded-sm outline-none mr-5" />
                            </div>

                            <div>
                                <p className='text-white mb-[10px] text-base'>Description</p>
                                <input type="text" placeholder="Add Something to your list!"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="w-96 py-2 p-2 border-violet-700 border rounded-sm outline-none mr-5" />
                            </div>
                            <div>
                                <button onClick={handlesubmit} className=' text-white rounded-sm bg-violet-700 mt-[32px] p-2 pb-3 pr-7 pl-6 text-md   '>Submit</button>
                            </div>
                        </div>

                        <hr className='mt-10' />

                        <div className='flex w-52 mt-10 '>
                            <button className={`bg-gray-600 px-4 py-2 text-base ${activate === false && 'bg-green-500'}`} onClick={() => { setActivate(false) }}>Todo</button>
                            <button className={`px-4 py-2 text-base bg-gray-600 ${activate === true && 'bg-green-500'}`} onClick={() => { setActivate(true) }}>Completed</button>
                        </div>

                    </div>
                    {activate === false &&
                        Array.isArray(todos) && todos?.map((items, item) =>
                        (


                            <div className=' bg-gradient-to-r from-cyan-500 to-blue-500 mt-5 p-3 rounded w-full text-lg flex justify-between items-center'>
                                <div className='w-3/4'>
                                    <div className='text-lg'>
                                        {items.task}
                                    </div>
                                    <div className=' text-white'>
                                        {items.email}
                                        {items.completedTime}
                                    </div>
                                </div>
                                {items.age}
                                <div>
                                    <span className='flex'>
                                        <MdDelete className=' mr-1 text-3xl' onClick={(e) => handleDelete(items._id)} />
                                        <span><FaRegEdit className='  text-3xl' onClick={handleComplete} />
                                        </span>
                                    </span>
                                </div>
                            </div>

                        ))}
                    {/* {activate === true && completedTime} */}


                    {/* { activate === true &&
                Array.isArray(currDate) && currDate?.map((items, item) =>
                (
                   
                       
                            <div className=' bg-gradient-to-r from-cyan-500 to-blue-500 mt-5 p-3 rounded w-full text-lg flex justify-between items-center'>
                                     <div className='w-3/4'>
                                     <div  >
                                            {items.task}
                                        </div>
                                <div className=' text-white'>
                                    {items.email}
                                    <p>{items.currDate}</p>
                                </div>
                                     </div>
                                {items.age}
                               <div>
                               <span className='flex'>
                                    <MdDelete className=' mr-1 text-3xl' onClick={(e) => handleDelete(items._id)} />

                                    <span><FaRegEdit className='  text-3xl' />
                                    </span>
                                </span>
                               </div>
                            </div>

                       )) }  */}


                </div>
            </div >

        </>
    )
};

export default Dashboard;