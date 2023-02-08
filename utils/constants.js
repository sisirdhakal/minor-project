
export const signupOptions = [
    {
        id: 1,
        image: "/assets/images/student.svg",
        boundary: "w-[40px] h-[40px]",
        width: "40px",
        height: "40px",
        name: "Student"
    },
    {
        id: 2,
        image: "/assets/images/teacher.svg",
        boundary: "w-[60px] h-[56px]",
        width: "60px",
        height: "56px",
        name: "Teacher"
    },
    {
        id: 3,
        image: "/assets/images/parent.svg",
        boundary: "w-[44px] h-[44px]",
        width: "44px",
        height: "44px",
        name: "Parent"
    },
]

export const typeOneButton = [
    {
        id: 1,
        name: "Verify"
    },
    {
        id: 2,
        name: "Signup"
    },
]
export const typeTwoButton = [
    {
        id: 1,
        name: "Verify"
    },
    {
        id: 2,
        name: "Add"
    },
    {
        id: 3,
        name: "Signup"
    }
]

export const sidebarOptions = {
    student: [
        {
            id: 1,
            icon: "/assets/images/home.svg",
            url: "/student",
            name: "dashboard",

        },
        {
            id: 2,
            icon: "/assets/images/exam.svg",
            url: "/student/exams",
            name: "exams",

        },
        {
            id: 3,
            icon: "/assets/images/results.svg",
            url: "/student/results",
            name: "results",

        },
        {
            id: 4,
            icon: "/assets/images/attendance.svg",
            url: "/student/attendance",
            name: "attendance",

        },
        {
            id: 5,
            icon: "/assets/images/credits.svg",
            url: "/student/credits",
            name: "Credits/Payments",

        },
        {
            id: 6,
            icon: "/assets/images/notice.svg",
            url: "/student/notices",
            name: "notices",

        },
        {
            id: 7,
            icon: "/assets/images/complaints.svg",
            url: "/student/complaints",
            name: "complaints",

        },
        {
            id: 8,
            icon: "/assets/images/feedback.svg",
            url: "/student/teacherfeedback",
            name: "teacher feedback",

        },
        // {
        //     id: 9,
        //     icon: "/assets/images/routine.svg",
        //     url: "/dashboard/routine",
        //     name: "routine",

        // },
        // {
        //     id: 10,
        //     icon: "/assets/images/syllabus.svg",
        //     url: "/dashboard/syllabus",
        //     name: "syllabus",

        // },
        // {
        //     id: 11,
        //     icon: "/assets/images/calendar.svg",
        //     url: "/dashboard/calendar",
        //     name: "calendar",

        // },

    ],
    parent: [
        {
            id: 1,
            icon: "/assets/images/home.svg",
            url: "/parent",
            name: "dashboard",

        },
        {
            id: 2,
            icon: "/assets/images/feedback.svg",
            url: "/parent/teacherfeedback",
            name: "teacher feedback",

        },
        {
            id: 3,
            icon: "/assets/images/results.svg",
            url: "/parent/results",
            name: "results",

        },
        {
            id: 4,
            icon: "/assets/images/attendance.svg",
            url: "/parent/attendance",
            name: "attendance",

        }
    ],
    teacher: [
        {
            id: 1,
            icon: "/assets/images/home.svg",
            url: "/teacher",
            name: "dashboard",

        },
        {
            id: 2,
            icon: "/assets/images/exam.svg",
            url: "/teacher/exams",
            name: "exams",

        },
        {
            id: 3,
            icon: "/assets/images/results.svg",
            url: "/teacher/results",
            name: "results",

        },
        {
            id: 4,
            icon: "/assets/images/attendance.svg",
            url: "/teacher/attendance",
            name: "attendance",

        },

        {
            id: 5,
            icon: "/assets/images/notice.svg",
            url: "/teacher/notices",
            name: "notices",

        },
        {
            id: 6,
            icon: "/assets/images/complaints.svg",
            url: "/teacher/complaints",
            name: "complaints",

        },
        {
            id: 7,
            icon: "/assets/images/feedback.svg",
            url: "/teacher/givefeedback",
            name: "give feedback",

        },
    ]
}

export const statsOptions = [
    {
        title: 'Due',
        icon: "/assets/images/payment.svg",
        id: 2,
        body: "No Due!"
    },
    {
        title: 'Feedback',
        icon: "/assets/images/feedbackimage.svg",
        id: 3,
        body: "See feedback from your teachers."
    },
]

export const userType = [
    {
        type: "teacher",
        value: {
            steps: 2,
            quote: "Teachers who love teaching, teach students to love learning.",
            step1: "Verify teacher's details",
            placeholder1: "Portal ID"

        }
    },
    {
        type: "student",
        value: {
            steps: 2,
            quote: "The real teacher is the student’s curiosity.",
            step1: "Verify student's details",
            placeholder1: "Portal ID"
        }
    },
    {
        type: "parent",
        value: {
            steps: 3,
            quote: "Behind every child who believes himself is a parent who believed first.",
            step1: "Verify student's details",
            placeholder1: "Student's Name"
        }
    }
]