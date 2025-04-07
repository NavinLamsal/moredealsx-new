import { Clock1 } from 'lucide-react'
import React from 'react'

const ActivityList = () => {
  return (
    <>
    <h3 className="text-2xl text-gray-700 font-bold mb-6 ml-3"> Activity</h3>
    
    <ol >
      <li className="border-l-2 border-green-600">
        <div className="md:flex flex-start">
          <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
            <Clock1 className="text-white w-3 h-3" />
          </div>
          <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-xl ml-6 mb-10">
            <div className="flex justify-between mb-4">
              <h4  className="font-medium text-primary hover:text-primary focus:text-primary duration-300 transition ease-in-out text-sm">Awesome Employers</h4>
              <h6  className="font-medium text-primary hover:text-primary focus:text-primary duration-300 transition ease-in-out text-sm">21 / 12 / 2021</h6>
            </div>
            <p className="text-muted-foreground ">Voluptatibus temporibus esse illum eum aspernatur, fugiat suscipit natus! Eum corporis illum nihil officiis tempore. Excepturi illo natus libero sit doloremque, laborum molestias rerum pariatur quam ipsam necessitatibus incidunt, explicabo.</p>
          </div>
        </div>
      </li>
    </ol>
    
    </>
  )
}

export default ActivityList