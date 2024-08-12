import express, { Express, Request, Response } from "express";

const app:Express = express();
const port = 3000;

type astrologer = {
    id:number,
    name: string,
    expertise: string[],
    languages: string[],
    experience: string,
    rate: string,
    orders: number,
    rating: number,
    profileImage: string;
    discountedRate?: undefined|string,
    description : string,
    totalChatTime: string,
    totalCallTime: string,
}

const astrologers:astrologer[] = [
    {
        id: 1,
        name: "AnuradhaM",
        expertise: ["Vedic", "Numerology", "Vastu", "Prashana"],
        languages: ["Tamil"],
        experience: "2 Years",
        rate: "₹ 20/min",
        orders: 14390,
        discountedRate: "₹ 18/min",
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "AnuradhaM is a renowned Vedic astrologer. She has been practicing astrology for 2 years and has deep knowledge of Vedic astrology. She is known for her ability to offer simple and practical solutions to her clients' problems. AnuradhaM specializes in Vastu and Prashana, providing guidance and remedies for relationship issues, financial matters, health concerns, and career challenges. Her clients appreciate her straightforward approach and effective remedies.",
        totalChatTime: "76k mins",
        totalCallTime: "5k mins"
    },
    {
        id: 2,
        name: "Bupathi",
        expertise: ["Vedic", "Nadi"],
        languages: ["Tamil"],
        experience: "6 Years",
        rate: "₹ 28/min",
        orders: 15832,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Bupathi is an experienced astrologer with over 6 years of practice in Vedic and Nadi astrology. His deep understanding of Nadi astrology allows him to provide highly accurate readings that give clients insights into their life paths. Fluent in Tamil, Bupathi offers personalized consultations that address his clients' specific concerns, helping them make informed decisions and navigate challenges effectively. His clients value his calm demeanor and insightful guidance.",
        totalChatTime: "65k mins",
        totalCallTime: "4.5k mins"
    },
    {
        id: 3,
        name: "Mahipathim",
        expertise: ["Vedic", "Nadi"],
        languages: ["Telugu"],
        experience: "5 Years",
        rate: "₹ 22/min",
        orders: 12432,
        rating: 4.1,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Mahipathim is a skilled astrologer with 5 years of experience in Vedic and Nadi astrology. His expertise in Nadi astrology allows him to provide deep insights into his clients' lives and guide them in making important decisions. Fluent in Telugu, Mahipathim is dedicated to helping his clients find clarity and direction through his accurate and insightful readings.",
        totalChatTime: "54k mins",
        totalCallTime: "3.8k mins"
    },
    {
        id: 4,
        name: "ShanmugaS",
        expertise: ["Vedic"],
        languages: ["Tamil", "English"],
        experience: "8 Years",
        discountedRate: "₹ 28/min",
        rate: "₹ 29/min",
        orders: 20227,
        rating: 4.6,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "ShanmugaS is a highly experienced astrologer with 8 years of practice in Vedic astrology. His deep understanding of astrological principles allows him to provide his clients with detailed and accurate readings. Fluent in both Tamil and English, ShanmugaS offers his clients clear and practical advice that helps them navigate life's challenges with confidence. His clients appreciate his ability to offer insightful guidance and effective remedies for their problems.",
        totalChatTime: "89k mins",
        totalCallTime: "6.2k mins"
    },
    {
        id: 5,
        name: "Sendhen",
        expertise: ["Vedic", "Tarot"],
        languages: ["English", "Tamil"],
        experience: "4 Years",
        rate: "₹ 25/min",
        orders: 10342,
        rating: 4.0,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Sendhen is a dedicated astrologer with 4 years of experience in Vedic astrology and tarot reading. His dual expertise allows him to offer clients a unique combination of traditional astrological insights and intuitive tarot guidance. Fluent in English and Tamil, Sendhen's clients value his ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence.",
        totalChatTime: "48k mins",
        totalCallTime: "3.1k mins"
    },
    {
        id: 6,
        name: "Vidhya",
        expertise: ["Vedic", "Palmistry"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 26/min",
        orders: 15321,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Vidhya is a knowledgeable astrologer with 5 years of experience in Vedic astrology and palmistry. Her expertise in palmistry allows her to offer clients unique insights into their lives, complementing her traditional astrological readings. Fluent in Tamil, Vidhya provides her clients with clear and practical advice that helps them navigate life's challenges with ease.",
        totalChatTime: "62k mins",
        totalCallTime: "4.3k mins"
    },
    {
        id: 7,
        name: "Ramesh",
        expertise: ["Vedic", "Vastu"],
        languages: ["Tamil", "Hindi"],
        experience: "7 Years",
        rate: "₹ 30/min",
        orders: 18342,
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Ramesh is an experienced astrologer with 7 years of expertise in Vedic astrology and vastu shastra. His deep understanding of Vastu allows him to help clients create harmonious living spaces that support their well-being and prosperity. Fluent in Tamil and Hindi, Ramesh is dedicated to providing his clients with clear and actionable advice that helps them make informed decisions and navigate life's challenges.",
        totalChatTime: "78k mins",
        totalCallTime: "5.5k mins"
    },
    {
        id: 8,
        name: "Priya",
        expertise: ["Vedic", "Tarot"],
        languages: ["Tamil", "Telugu"],
        experience: "6 Years",
        rate: "₹ 28/min",
        orders: 16789,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Priya is a skilled astrologer with 6 years of experience in Vedic astrology and tarot reading. Her dual expertise allows her to provide clients with both traditional astrological insights and intuitive tarot guidance. Priya's clients appreciate her ability to offer clear and practical advice in both Tamil and Telugu. Whether you're facing a challenging decision or simply looking for direction, Priya's readings are designed to provide clarity and support, helping you navigate your life's journey with confidence.",
        totalChatTime: "68k mins",
        totalCallTime: "4.7k mins"
    },
    {
        id: 9,
        name: "Ravi",
        expertise: ["Vedic", "Nadi"],
        languages: ["Tamil", "Kannada"],
        experience: "7 Years",
        rate: "₹ 27/min",
        orders: 18321,
        rating: 4.4,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Ravi is an experienced astrologer with 7 years of expertise in Vedic and Nadi astrology. His deep understanding of Nadi astrology allows him to provide detailed and accurate readings that offer clients valuable insights into their lives. Ravi's ability to connect with clients in both Tamil and Kannada has made him a sought-after astrologer in his community. His readings are known for their clarity and precision, making him a trusted advisor for those seeking guidance on their life's path.",
        totalChatTime: "72k mins",
        totalCallTime: "5.0k mins"
    },
    {
        id: 10,
        name: "Lakshmi",
        expertise: ["Vedic", "Vastu"],
        languages: ["English", "Tamil"],
        experience: "4 Years",
        rate: "₹ 24/min",
        orders: 13432,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Lakshmi is a knowledgeable astrologer with 4 years of experience in Vedic astrology and vastu shastra. Fluent in both English and Tamil, she offers her clients clear and concise advice on a variety of life issues. Lakshmi’s expertise in vastu allows her to help clients create harmonious living spaces that support their well-being and prosperity. Her Vedic astrology readings are known for their accuracy and depth, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "56k mins",
        totalCallTime: "3.9k mins"
    },
    {
        id: 11,
        name: "Suresh",
        expertise: ["Vedic", "Numerology"],
        languages: ["Hindi"],
        experience: "8 Years",
        rate: "₹ 26/min",
        orders: 20453,
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Suresh is a highly experienced astrologer with 8 years of practice in Vedic astrology and numerology. His expertise in numerology allows him to provide clients with detailed and accurate readings that offer insights into their life's path and challenges. Fluent in Hindi, Suresh is known for his ability to provide practical advice that helps his clients make informed decisions and navigate their lives with confidence. His clients appreciate his calm demeanor and thoughtful guidance.",
        totalChatTime: "88k mins",
        totalCallTime: "6.1k mins"
    },
    {
        id: 12,
        name: "Kavitha",
        expertise: ["Vedic", "Nadi"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 23/min",
        orders: 15432,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Kavitha is a skilled astrologer with 5 years of experience in Vedic and Nadi astrology. Her deep understanding of Nadi astrology allows her to provide her clients with detailed and accurate readings that offer valuable insights into their lives. Fluent in Tamil, Kavitha's clients appreciate her ability to offer clear and practical advice that helps them navigate life's challenges with confidence. Her readings are known for their accuracy and depth, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "66k mins",
        totalCallTime: "4.5k mins"
    },
    {
        id: 13,
        name: "Vikram",
        expertise: ["Vedic", "Vastu"],
        languages: ["Tamil", "Hindi"],
        experience: "6 Years",
        rate: "₹ 27/min",
        discountedRate: "₹ 23/min",
        orders: 17432,
        rating: 4.4,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Vikram is an experienced astrologer with 6 years of expertise in Vedic astrology and vastu shastra. His deep understanding of Vastu allows him to help clients create harmonious living spaces that support their well-being and prosperity. Fluent in both Tamil and Hindi, Vikram provides his clients with clear and practical advice that helps them make informed decisions and navigate life's challenges with confidence. His clients appreciate his ability to offer insightful guidance and effective remedies for their problems.",
        totalChatTime: "72k mins",
        totalCallTime: "5.0k mins"
    },
    {
        id: 14,
        name: "Radha",
        expertise: ["Vedic", "Tarot"],
        languages: ["English", "Tamil"],
        experience: "5 Years",
        rate: "₹ 26/min",
        orders: 16342,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Radha is a dedicated astrologer with 5 years of experience in Vedic astrology and tarot reading. Her dual expertise allows her to offer clients a unique combination of traditional astrological insights and intuitive tarot guidance. Fluent in English and Tamil, Radha's clients value her ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence. Her readings are known for their clarity and precision, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "64k mins",
        totalCallTime: "4.4k mins"
    },
    {
        id: 15,
        name: "Krishna",
        expertise: ["Vedic", "Palmistry"],
        languages: ["Tamil"],
        experience: "7 Years",
        rate: "₹ 28/min",
        orders: 18321,
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Krishna is a knowledgeable astrologer with 7 years of experience in Vedic astrology and palmistry. His expertise in palmistry allows him to offer clients unique insights into their lives, complementing his traditional astrological readings. Fluent in Tamil, Krishna is dedicated to providing his clients with clear and practical advice that helps them navigate life's challenges with ease. His readings are known for their accuracy and depth, making him a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "78k mins",
        totalCallTime: "5.3k mins"
    },
    {
        id: 16,
        name: "Bhavani",
        expertise: ["Vedic", "Numerology"],
        languages: ["Tamil", "English"],
        experience: "4 Years",
        rate: "₹ 25/min",
        discountedRate: "₹ 23/min",
        orders: 14232,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Bhavani is a skilled astrologer with 4 years of experience in Vedic astrology and numerology. Her expertise in numerology allows her to provide clients with detailed and accurate readings that offer insights into their life's path and challenges. Fluent in both Tamil and English, Bhavani's clients value her ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence.",
        totalChatTime: "58k mins",
        totalCallTime: "4.0k mins"
    },
    {
        id: 17,
        name: "Ganesh",
        expertise: ["Vedic", "Tarot"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 23/min",
        orders: 15232,
        rating: 4.1,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Ganesh is a dedicated astrologer with 5 years of experience in Vedic astrology and tarot reading. His dual expertise allows him to offer clients a unique combination of traditional astrological insights and intuitive tarot guidance. Fluent in Tamil, Ganesh's clients appreciate his ability to offer clear and practical advice that helps them navigate life's challenges with confidence. His readings are known for their clarity and precision, making him a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "63k mins",
        totalCallTime: "4.3k mins"
    },
    {
        id: 18,
        name: "Nisha",
        expertise: ["Vedic", "Vastu"],
        languages: ["English", "Tamil"],
        experience: "4 Years",
        rate: "₹ 25/min",
        orders: 13232,
        rating: 4.1,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Nisha is a knowledgeable astrologer with 4 years of experience in Vedic astrology and vastu shastra. Fluent in both English and Tamil, she offers her clients clear and concise advice on a variety of life issues. Nisha's expertise in vastu allows her to help clients create harmonious living spaces that support their well-being and prosperity. Her Vedic astrology readings are known for their accuracy and depth, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "52k mins",
        totalCallTime: "3.7k mins"
    },
    {
        id: 19,
        name: "Karthik",
        expertise: ["Vedic", "Palmistry"],
        languages: ["Tamil", "Telugu"],
        experience: "6 Years",
        rate: "₹ 26/min",
        orders: 16432,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Karthik is a skilled astrologer with 6 years of experience in Vedic astrology and palmistry. His expertise in palmistry allows him to offer clients unique insights into their lives, complementing his traditional astrological readings. Fluent in Tamil and Telugu, Karthik is dedicated to providing his clients with clear and practical advice that helps them navigate life's challenges with ease.",
        totalChatTime: "66k mins",
        totalCallTime: "4.8k mins"
    },
    {
        id: 20,
        name: "Madhuri",
        expertise: ["Vedic", "Numerology"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 24/min",
        orders: 14232,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Madhuri is a skilled astrologer with 5 years of experience in Vedic astrology and numerology. Her expertise in numerology allows her to provide clients with detailed and accurate readings that offer insights into their life's path and challenges. Fluent in Tamil, Madhuri's clients value her ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence. Her readings are known for their clarity and precision, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "58k mins",
        totalCallTime: "4.1k mins"
    }
]

app.get('/api/astrologers' , (req:Request , res:Response)=>{
    res.status(200).send(astrologers)
})


app.listen(port , ()=>{
    console.log("Server Started...")
})


