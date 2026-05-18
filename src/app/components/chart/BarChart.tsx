"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetAuth } from "@/app/lib/api/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarchartParentProps = {
  type: string;
  topic_id: string;
};

type BarchartChildProps = {
  jumlah_peserta: number;
  quiz_data: any;
}



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Nomor Soal",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Jumlah Peserta",
      },
    },
  },
};



const BarChartParent : React.FC<BarchartParentProps> = ({ type, topic_id }) =>  {
  const queryKey = type === 'know' ? 'barchartknow' : type === 'learned' ? 'barchartlearned' : 'barchart';
  const { data:barchart } = useGetAuth(
    `/api/analysis/quiz-barchart/${type}/${topic_id}`,
    queryKey
  );


  return (
    <div>
      {
        barchart && <BarChart jumlah_peserta={barchart.quiz_data.length} quiz_data={barchart.quiz_data} />
      }
    </div>
  );
  
}

const BarChart: React.FC<BarchartChildProps> = ({jumlah_peserta, quiz_data}) => {
    const labels = Array.from({ length: jumlah_peserta }, (_, i) => i + 1);
    const quiz_correct_answers = quiz_data.map((quiz:any) => quiz.correct_answers);

  const data = {
    labels,
    datasets: [
      {
        label: "Jumlah Peserta",
        data: quiz_correct_answers,
        backgroundColor: "rgb(28,116,180)",
      }
    ],
  };
  
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChartParent;
