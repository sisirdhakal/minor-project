
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

export const dashboardStudent = [
    {
        id: 1,
        icon: "/assets/images/home.svg",
        url: "/",
        name: "dashboard",

    },
    {
        id: 2,
        icon: "/assets/images/exam.svg",
        url: "/exams",
        name: "exams",

    },
    {
        id: 3,
        icon: "/assets/images/results.svg",
        url: "/results",
        name: "results",

    },
    {
        id: 4,
        icon: "/assets/images/attendance.svg",
        url: "/attendance",
        name: "attendance",

    },
    {
        id: 5,
        icon: "/assets/images/credits.svg",
        url: "/Credits",
        name: "Credits/Payments",

    },
    {
        id: 6,
        icon: "/assets/images/notice.svg",
        url: "/notices",
        name: "notices",

    },
    {
        id: 7,
        icon: "/assets/images/complaints.svg",
        url: "/complaints",
        name: "complaints",

    },
    {
        id: 8,
        icon: "/assets/images/feedback.svg",
        url: "/teacherfeedback",
        name: "teacher feedback",

    },
    {
        id: 9,
        icon: "/assets/images/routine.svg",
        url: "/routine",
        name: "routine",

    },
    {
        id: 10,
        icon: "/assets/images/syllabus.svg",
        url: "/syllabus",
        name: "syllabus",

    },
    {
        id: 11,
        icon: "/assets/images/calendar.svg",
        url: "/calendar",
        name: "calendar",

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