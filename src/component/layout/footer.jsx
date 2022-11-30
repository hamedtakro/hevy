import { Typography } from '@mui/material';
import React from 'react'
import logo from "../../logo.png";
import logors from "../../logors.png";

const Footer = () => {
    return (
        <div className='sm:mb-0 flex items-end'>
            <footer class="p-4  shadow md:px-6 md:py-8 w-full footer">
                <div class="flex items-center justify-between">
                    <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
                        <div className="navLogo">
                            <a href='/'><img className='hidden sm:flex' src={logo} width="110" height="26" /></a>
                            <a href='/'><img className='flex sm:hidden ' src={logors} width="35  " height="35" /></a>
                        </div>
                    </a>
                    <ul class="flex  flex-nowrap flex-row items-center mb-6 text-sm text-gray-800 sm:mb-0 dark:text-gray-600">
                        <li className='mx-2'>
                            <a href="#" class=" hover:underline  "><Typography > درباره ی ما </Typography></a>
                        </li>
                        <li className='mx-2'>
                            <a href="#" class=" hover:underline "><Typography > حریم خصوصی</Typography></a>
                        </li>
                        <li className='mx-2'>
                            <a href="#" class=" hover:underline  "><Typography >مجوز</Typography></a>
                        </li>
                        <li className='mx-2'>
                            <a href="#" class=" hover:underline "><Typography > ارتباط با ما</Typography></a>
                        </li>
                    </ul>

                </div>
                <hr class=" mt-4 border-gray-200 mx-auto dark:border-gray-700 " />
                <span class=" mb-20  md:mb-5     block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="http://younikweb.ir" class="hover:underline">younikweb™</a>. All Rights Reserved.
                </span>
            </footer>

        </div>
    )
}

export default Footer
