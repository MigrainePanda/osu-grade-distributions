import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
  } from "chart.js";
  import zoomPlugin from 'chartjs-plugin-zoom'; 
  
  export const registerCharts = () => {
    Chart.register(
      ArcElement,
      BarElement,
      CategoryScale,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      Title,
      Tooltip,
      RadialLinearScale,
      Filler,
      zoomPlugin
    )
  }