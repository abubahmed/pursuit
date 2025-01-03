import { FaChartArea } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { RiNotification2Fill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";

export const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Facebook",
    location: "Menlo Park, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Apple",
    location: "Cupertino, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "Microsoft",
    location: "Redmond, WA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 6,
    title: "Software Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 7,
    title: "Software Engineer",
    company: "Twitter",
    location: "San Francisco, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 8,
    title: "Software Engineer",
    company: "LinkedIn",
    location: "Sunnyvale, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 9,
    title: "Software Engineer",
    company: "Uber",
    location: "San Francisco, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 10,
    title: "Software Engineer",
    company: "Lyft",
    location: "San Francisco, CA",
    date: "2021-10-01",
    status: "Applied",
  },
];

export const seasons = [
  {
    name: "Summer 2025",
    startDate: "2025-06-01",
  },
  {
    name: "Fall 2025",
    startDate: "2025-09-01",
  },
  {
    name: "Winter 2025",
    startDate: "2025-12-01",
  },
  {
    name: "Spring 2026",
    startDate: "2026-03-01",
  },
];

export const FAQs = [
  {
    question: "How do I create an account on Pursuit?",
    answer:
      "Creating an account on Pursuit is as easy as clicking the 'Sign Up' button on the homepage and signing in with your Google account. From there, you can start adding job applications and tracking your job search progress.",
  },
  {
    question: "Is Pursuit free to use?",
    answer:
      "Pursuit offers both free and premium plans. The free plan includes basic features, while the premium plan provides additional functionalities and expanded job application and season limits.",
  },
  {
    question: "How do I update the status of my job applications?",
    answer:
      "To update the status of your job applications, go to your dashboard, select the application you want to update, and choose the new status from the dropdown menu.",
  },
  {
    question: "How secure is my data on Pursuit?",
    answer:
      "Pursuit takes data security seriously. We use industry-standard data security measures to protect your personal information and ensure your data is safe from attackers and breaches.",
  },
  {
    question: "Can I export my job application data?",
    answer:
      "Yes, you can export your job application data from Pursuit in CSV format. To export your data, simply select the 'Export Data' option from the dashboard menu.",
  },
  {
    question: "How do I contact Pursuit support?",
    answer:
      "You can contact Pursuit support by clicking on the 'Support' link in the app or by sending an email to support@pursuit.com. Our support team is available 24/7 to assist you.",
  },
  {
    question: "What job characteristics does Pursuit track?",
    answer:
      "Pursuit tracks various job characteristics such as job title, company name, job location, salary range, application deadline, and job description. You can view these details for each application in your dashboard.",
  },
  {
    question: "Can I compare job applications in Pursuit?",
    answer:
      "Yes, Pursuit allows you to compare job applications side by side to evaluate factors such as salary, benefits, location, and job responsibilities.",
  },
  {
    question: "What options do I have for adding job applications?",
    answer:
      "You can add job applications by either uploading the URL of the job posting or pasting in the text content of the job description. Pursuit will automatically extract the relevant information and populate the fields for you.",
  },
  {
    question: "How do I filter job applications in Pursuit?",
    answer:
      "You can filter job applications in Pursuit by various criteria such as job level, job mode, job type, and job application status. This allows you to view specific subsets of your job applications based on your preferences.",
  },
  {
    question: "What are seasons used for in Pursuit?",
    answer:
      "Seasons in Pursuit are used to help you stay organized by grouping job applications together. You can create different seasons for different time periods or job search cycles.",
  },
  {
    question: "How do I favorite a job application in Pursuit?",
    answer:
      "To favorite a job application in Pursuit, click on the star icon next to the application. This will mark the application as a favorite and allow you to easily access it from your dashboard.",
  },
];

export const features = [
  {
    title: "Sort Jobs Into Seasons",
    description:
      "Separate your job applications by application season to keep track of every job you apply to.",
    Icon: FaBox,
  },
  {
    title: "Favorite Job Applications",
    description: "Mark certain jobs as favorite to keep track of the jobs you love the most.",
    Icon: FaExclamationCircle,
  },
  {
    title: "Filter Jobs By Traits",
    description:
      "Filter your job applications by job characteristics to take a closer look at your job search.",
    Icon: FaChartArea,
  },
  {
    title: "See Job Characteristics",
    description: "See detailed information about the jobs you applied right in your dashboard.",
    Icon: BsFillInfoSquareFill,
  },
  {
    title: "Flexible Job Tracking",
    description:
      "Save job applications from any source, whether it's a URL or just plain text content.",
    Icon: FaListAlt,
  },
  {
    title: "Track Your Applications",
    description: "Update the status of your job applications and keep track of your progress.",
    Icon: FaListAlt,
  },
];

export const footer = [
  {
    title: "Company",
    links: [
      { text: "About Us", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Blog", href: "#" },
      { text: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { text: "Help Center", href: "#" },
      { text: "Safety Center", href: "#" },
      { text: "Community Guidelines", href: "#" },
      { text: "Accessibility", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "Cookie Policy", href: "#" },
      { text: "Security", href: "#" },
    ],
  },
];

export const pricing: any = [
  {
    level: "Free",
    description:
      "Free plan for early-careerists and casual job searchers to get started with job applications.",
    price: "$0",
    features: [
      "10 job applications/week",
      "1 job season",
      "Low-speed uploads",
      "Limited job characteristics",
    ],
  },
  {
    level: "Basic",
    description:
      "Basic plan for active job seekers to keep track of multiple, concurrent job applications.",
    price: "$10",
    features: [
      "100 job applications/week",
      "Unlimited job seasons",
      "High-speed uploads",
      "Full job characteristics",
    ],
  },
  {
    level: "Premium",
    description:
      "Premium plan for active job seekers who want to get the most out of their job search.",
    price: "$30",
    features: [
      "Unlimited job applications",
      "Unlimited job seasons",
      "High-speed uploads",
      "Full job characteristics",
    ],
  },
];

export const reviews = [
  {
    name: "John Doe",
    title: "Software Engineer",
    rating: 5,
    review:
      "This job tracker app is a game-changer. It has helped me keep track of all my job applications and stay organized throughout the job search process.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    title: "Product Manager",
    rating: 4,
    review:
      "I love the user-friendly interface and the ability to set reminders for follow-ups. It has made my job search much more manageable.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Alice Johnson",
    title: "UX Designer",
    rating: 5,
    review:
      "The job tracker app is fantastic! It allows me to track my applications, interviews, and offers all in one place. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Bob Brown",
    title: "Data Scientist",
    rating: 4,
    review:
      "A very useful tool for job seekers. The analytics feature gives me insights into my job search progress, which is very motivating.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Charlie Davis",
    title: "Marketing Specialist",
    rating: 3,
    review:
      "The app is good, but I wish it had more customization options for the dashboard. Overall, it’s still a helpful tool.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Wilson",
    title: "HR Manager",
    rating: 5,
    review:
      "As an HR professional, I find this app incredibly useful for managing my job applications and keeping track of my interactions with potential employers.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Frank Thomas",
    title: "Business Analyst",
    rating: 4,
    review:
      "The job tracker app has streamlined my job search process. The ability to store and organize all my job-related documents is a big plus.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Grace Lee",
    title: "Sales Executive",
    rating: 5,
    review:
      "I highly recommend this app to anyone looking for a job. It’s easy to use and has all the features you need to stay on top of your job search.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Hannah White",
    title: "Graphic Designer",
    rating: 5,
    review:
      "This app has been a lifesaver during my job search. The ability to track all my applications and set reminders for follow-ups is fantastic.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Jack Green",
    title: "Project Manager",
    rating: 4,
    review:
      "A very helpful tool for job seekers. The analytics feature provides great insights into my job search progress.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Isabella Brown",
    title: "Content Writer",
    rating: 5,
    review:
      "I love how easy it is to use this app. It has made my job search process so much more organized and efficient.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "Liam Johnson",
    title: "Web Developer",
    rating: 4,
    review:
      "The job tracker app is very useful. It helps me keep track of all my applications and stay on top of my job search.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

export const statusChoices = [
  "Research",
  "Applied",
  "Interview",
  "Assessment",
  "Offer",
  "Rejected",
  "Waitlisted",
  "Withdrawn",
  "Other",
];

export const duringChoices = ["Winter", "Spring", "Summer", "Fall", "Year-round", "Other"];

export const typeChoices = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
  "Other",
];

export const levelChoices = ["Entry", "Mid", "Senior", "Lead", "Manager", "Director", "Other"];

export const modeChoices = ["Remote", "Onsite", "Hybrid", "Other"];
