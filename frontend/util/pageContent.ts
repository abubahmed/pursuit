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
      "To create an account on Pursuit, click on the 'Sign Up' button on the homepage and fill in the required details. You will receive a confirmation email to verify your account.",
  },
  {
    question: "Is Pursuit free to use?",
    answer:
      "Pursuit offers both free and premium plans. The free plan includes basic features, while the premium plan provides additional functionalities such as advanced analytics and priority support.",
  },
  {
    question: "How do I update the status of my job applications?",
    answer:
      "To update the status of your job applications, go to your dashboard, select the application you want to update, and choose the new status from the dropdown menu.",
  },
  {
    question: "Can I set reminders for important dates?",
    answer:
      "Yes, Pursuit allows you to set reminders for important dates such as interview schedules and follow-up deadlines. You can receive notifications via email or within the app.",
  },
  {
    question: "How secure is my data on Pursuit?",
    answer:
      "Pursuit takes data security seriously. We use industry-standard encryption and security measures to protect your personal information and ensure your data is safe.",
  },
  {
    question: "Can I export my job application data?",
    answer:
      "Yes, you can export your job application data in various formats such as CSV or PDF. This feature is available in the premium plan.",
  },
  {
    question: "How do I contact Pursuit support?",
    answer:
      "You can contact Pursuit support by clicking on the 'Support' link in the app or by sending an email to support@pursuit.com. Our support team is available 24/7 to assist you.",
  },
  {
    question: "Can I customize the job application fields?",
    answer:
      "Yes, Pursuit allows you to customize the job application fields to suit your needs. You can add, remove, or modify fields to track the information that is most important to you.",
  },
  {
    question: "What type of analytics does Pursuit provide?",
    answer:
      "Pursuit provides detailed analytics on your job application progress, including the number of applications submitted, response rates, and interview success rates. You can use this data to improve your job search strategy.",
  },
  {
    question: "What job characteristics does Pursuit track?",
    answer:
      "Pursuit tracks various job characteristics such as job title, company name, job location, salary range, application deadline, and job description. You can view these details for each application in your dashboard.",
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
    title: "Priority Job Applications",
    description: "Mark certain jobs as high priority to keep track of the jobs you love the most.",
    Icon: FaExclamationCircle,
  },
  {
    title: "Get Job Analytics",
    description: "Get insights on your job application progress and see how you can improve.",
    Icon: FaChartArea,
  },
  {
    title: "See Job Characteristics",
    description: "See detailed information about the jobs you applied right in your dashboard.",
    Icon: BsFillInfoSquareFill,
  },
  {
    title: "Get Reminders",
    description: "Get reminders for follow-ups and interviews to never miss an opportunity.",
    Icon: RiNotification2Fill,
  },
  {
    title: "Track Your Offers",
    description: "Track the offers you receive and compare them to make the best decision.",
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
      "Limited analytics",
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
      "Full analytics",
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
      "Full analytics",
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
      "This app has been a lifesaver in keeping my job search organized. The design is intuitive and the features are exactly what I need.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Ian Black",
    title: "Financial Analyst",
    rating: 4,
    review:
      "A very practical tool for job seekers. The reminders and tracking features have helped me stay on top of my applications.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Jessica Green",
    title: "Content Writer",
    rating: 5,
    review:
      "I love how easy it is to use this app. It has made my job search process so much more efficient and less stressful.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "Kevin Brown",
    title: "Operations Manager",
    rating: 4,
    review:
      "The app is very helpful for managing job applications. The analytics feature is particularly useful for tracking my progress.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];
