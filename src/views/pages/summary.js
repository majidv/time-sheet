import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

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

import Footer from "../components/footer";
import NavBar from "../components/navBar";
import Sidebar from "../components/sideBar";
import Colors from "../../constants/colors.json";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../actions/tasks.actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Summary",
    },
  },
};

const datas = [
  { id: "1", age: 20 },
  { id: "2", age: 30 },
  { id: "2", age: "20" },
  { id: "3", age: 20 },
  { id: "5", age: 10 },
];

export default function Summary() {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const { tasksList } = useSelector(
    (state) => ({
      tasksList: state.tasksReducer.tasksList,
    }),
    shallowEqual
  );

  useEffect(() => {
    const uniqueData = tasksList.reduce(
      (a, { date, time }) => ((a[date] = (a[date] || 0) + +time), a),
      {}
    );
    const sortedUniqueData = {};
    Object.keys(uniqueData)
      .sort(function (a, b) {
        return Number(new Date(a)) - Number(new Date(b));
      })
      .forEach(function (key) {
        sortedUniqueData[key] = uniqueData[key];
      });
    setLabels(Object.keys(sortedUniqueData));
    setValues(Object.values(sortedUniqueData));
  }, [tasksList]);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Work Hours",
        data: values,
        backgroundColor: Colors.dark_green,
      },
    ],
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <Container fluid style={{ height: "88%" }}>
        <Row className="h-100" style={{ backgroundColor: Colors.white }}>
          <Col
            style={{ backgroundColor: Colors.light_green }}
            className="d-none d-sm-block"
            sm={2}
          >
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Row className="mt-3">
              <Col>
                <Bar options={options} data={data} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
}
