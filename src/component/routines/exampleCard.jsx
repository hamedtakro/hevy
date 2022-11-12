import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import App from '../../App'
import Routines from './routines'
import { deleteExercise } from '../../store/slice/exerciseSlice'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ExampleCard({ Id  ,seperator}) {
 const dispatch = useDispatch()
    // const [refresh , setRefresh] = useState(false)
    const handleDelete = () => {
        if(seperator == 1){dispatch(deleteExercise(Id))}
        // if(seperator == 2){dispatchUpdateDelete(Id)}
}

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center bg-white px-2 py-2 
        text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1
         focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-gray-100">
                     <MoreVertIcon />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute  z-10 mt-2 w-16 origin-top-right  rounded-md bg-white shadow-lg ring-1
                ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1  w-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={handleDelete}
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block pl-8 pr-1    py-2 text-sm'
                                    )}
                                >
                                 <div className='flex  row-auto'> <h2>delete</h2>  <DeleteIcon /> </div>
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
