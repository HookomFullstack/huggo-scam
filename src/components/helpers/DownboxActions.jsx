import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BtnDownloadTxt } from '../utils/BtnDownloadTxt'
import { BtnDownloadTxtAndDelete } from '../utils/BtnDownloadAndDelete'

export const DownboxActions = () => {
  return (
    <div style={{zIndex: '100000000000000'}}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-[#0072FF] px-4 py-[7px] text-sm text-white hover:bg-[#0073ffe3]">
            Acciones
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Menu.Items className=" absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none">
            <div className="px-1 py-1 ">
                <div className='pb-1'>
                    <Menu.Item>
                        <BtnDownloadTxt />
                    </Menu.Item>
                </div>
                <div className='border-t-[1px] pt-1 '>
                    <Menu.Item>
                        <BtnDownloadTxtAndDelete />
                    </Menu.Item>
                </div>
 
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
