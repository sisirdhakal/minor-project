import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const EditClassComp = ({ cookie, id }) => {

    return (
        <div>
            <div>
                <CollegeAdminHero parent={"class"} title={"Edit Class"} image={"/assets/images/class.svg"} />
            </div>
            
        </div>
    )
}

export default EditClassComp