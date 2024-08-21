"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mapping moods to numbers for charting
const moodMap = {
  angry: 1,
  anxious: 2,
  neutral: 3,
  happy: 4,
  sad: 5,
};

const moodNames = ["angry", "anxious", "neutral", "happy", "sad"];

// Function to get all dates in the current month
const getAllDatesInMonth = (): string[] => {
  const dates = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day).toISOString().split("T")[0]);
  }

  return dates;
};

type ProfileType = {
  profile_picture: string;
  username: string;
  bio: string;
  email: string;
  name: string;
};

type MoodDataType = {
  date: string;
  mood: keyof typeof moodMap;
};

type InsightsType = {
  most_frequent_mood: string;
  average_mood: number;
};

type GoalType = {
  id: number;
  goal_type: keyof typeof moodMap;
  progress: number;
  target: number;
  end_date: string;
};

type LatestMoodDataType = {
  [key: string]: MoodDataType;
};

// Component for displaying a streak meter
const StreakMeter: React.FC<{ latestMoodData: LatestMoodDataType }> = ({
  latestMoodData,
}) => {
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 is Sunday, 6 is Saturday
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the 7 days centered around today
  const displayedDays = Array.from({ length: 7 }).map((_, i) => {
    const index = (currentDayIndex - 3 + i + 7) % 7;
    const date = new Date(today);
    date.setDate(today.getDate() - (3 - i));
    return {
      dayName: daysOfWeek[index],
      date: date.toISOString().split("T")[0],
    };
  });

  return (
    <div className="streak-container flex justify-between">
      {displayedDays.map(({ dayName, date }, index) => (
        <button
          key={index}
          className={`streak-day border rounded-3xl pl-4 pr-4 border-black dark:border-white ${
            latestMoodData[date] ? "marked" : ""
          }`}
        >
          {dayName}
        </button>
      ))}
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [moodData, setMoodData] = useState<MoodDataType[]>([]);
  const [insights, setInsights] = useState<InsightsType>({
    most_frequent_mood: "",
    average_mood: 0,
  });
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    router.push("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get<ProfileType>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchInsights = async () => {
        try {
          const response = await axios.get<InsightsType>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/insights/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setInsights(response.data);
        } catch (error) {
          console.error("Error fetching insights:", error);
        }
      };
      fetchInsights();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchGoals = async () => {
        try {
          const response = await axios.get<GoalType[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/goals/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setGoals(response.data);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      };
      fetchGoals();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchMoodData = async () => {
        try {
          const response = await axios.get<MoodDataType[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/moods/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setMoodData(response.data);
        } catch (error) {
          console.error("Error fetching mood data:", error);
        }
      };
      fetchMoodData();
    }
  }, [token]);

  const latestMoodData: LatestMoodDataType = moodData.reduce(
    (acc, mood) => {
      const date = mood.date.split("T")[0];
      if (!acc[date] || new Date(mood.date) > new Date(acc[date].date)) {
        acc[date] = mood;
      }
      return acc;
    },
    {} as LatestMoodDataType
  );

  const datesInMonth = getAllDatesInMonth();

  const moodMapByDate = datesInMonth.map((date) => {
    const mood = latestMoodData[date];
    return mood ? moodMap[mood.mood] : null;
  });

  const chartData = {
    labels: datesInMonth.map((date) => new Date(date).getDate()),
    datasets: [
      {
        label: "Mood Over Time",
        data: moodMapByDate,
        fill: false,
        backgroundColor: "white",
        borderColor: "black",
        spanGaps: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function (value: number | string) {
            return moodNames[Number(value) - 1] || value;
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };

  const predictUpcomingMood = (
    moodData: MoodDataType[],
    daysToConsider = 7
  ): string => {
    const recentMoods = moodData.slice(-daysToConsider);
    if (recentMoods.length === 0) return "neutral"; // Default to neutral if no data

    // Assign weights: most recent day gets the highest weight
    const weights = recentMoods.map((_, index) => index + 1);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    const weightedMoodSum = recentMoods.reduce((sum, mood, index) => {
      return sum + moodMap[mood.mood] * weights[index];
    }, 0);

    const weightedAverageMood = weightedMoodSum / totalWeight;
    const predictedMoodIndex = Math.round(weightedAverageMood) - 1;

    return moodNames[predictedMoodIndex] || "neutral"; // Return mood name
  };

  const getMoodLabel = (averageMood: number): string => {
    const moodIndex = Math.round(averageMood) - 1;
    return moodNames[moodIndex] || "neutral";
  };

  const predictedMood = predictUpcomingMood(moodData);
  const averageMoodLabel = getMoodLabel(insights.average_mood);

   return (
    <div className="min-h-100vh w-full p-5 md:pl-10 md:pr-10 mt-24 overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full w-full m-0 p-0">
        {/* Left Section (L1) */}
        <motion.div 
          className="col-span-1 md:col-span-4 rounded-3xl glassmorphism border-2 flex flex-col justify-between items-center w-full m-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex-grow flex flex-col items-center justify-center w-full">
            <div className="profile-picture-container rounded-3xl md:w-full"></div>
            {profile && (
              <>
                <h1 className="text-2xl text-center font-bold w-full">
                  {profile.username}
                </h1>
                <p className="text-sm text-center w-full">{profile.email}</p>
              </>
            )}
          </div>
          {profile && (
            <button
              onClick={handleLogout}
              className="rounded-3xl border-2 p-4 bg-black dark:bg-white dark:text-black text-orange-100 mb-4 w-5/6"
            >
              Logout
            </button>
          )}
        </motion.div>

        {/* Right Section (R1) */}
        <div className="col-span-1 md:col-span-8 flex flex-col space-y-4 w-full m-0 p-0">
          {/* T1 Section (Streak Meter) */}
          <motion.div 
            className="t1-container l1-container flex-grow w-full hidden md:block overflow-x-auto m-0 p-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <StreakMeter latestMoodData={latestMoodData} />
          </motion.div>

          {/* T2 Section (Monthly Mood Graph) */}
          <motion.div 
            className="t2-container l1-container flex-grow w-full m-0 p-2 glassmorphism rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-bold">Monthly Mood Graph</h2>
            <Line data={chartData} options={chartOptions} />
          </motion.div>

          {/* B2 Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow w-full m-0 p-2 glassmorphism rounded-3xl">
            {/* L2 Section (Mood Insights) */}
            <motion.div 
              className="l2-container l1-container w-full m-0 p-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold">Mood Insights</h2>
              <p>Most Frequent Mood: {insights.most_frequent_mood}</p>
              <p>Average Mood: {averageMoodLabel}</p>
            </motion.div>

            {/* R2 Section (Predicted Mood) */}
            <motion.div 
              className="rounded-3xl w-full m-0 z-50 p-5 gradient-bg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold">AI Predicted Mood</h2>
              <p>Weather, Previous Entry Based Mood Prediction For Tomorrow: {predictedMood}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .l1-container {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 15px;
          border-radius: 15px;
          z-index: 10;
        }
        .profile-picture-container {
          width: 100%;
          max-width: 200px;
          height: 200px;
          background: linear-gradient(45deg, red, #8b5cf6, #c4b5fd, #e11d48);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .goal-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-primary {
          background: transparent;
          border: 1px solid black;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        .streak-container {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          flex-wrap: wrap;
        }
        .streak-day {
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid black;
          background-color: transparent;
          color: black;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 5px;
        }
        .streak-day.marked {
          background-color: black;
          color: white;
        }
        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .streak-day {
            border: 1px solid white;
            color: white;
          }
          .streak-day.marked {
            background-color: white;
            color: black;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
