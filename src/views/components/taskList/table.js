//** React Imports */
import { Fragment, useEffect, useState } from "react";

//** Third party Imports */
import DataTable from "react-data-table-component";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Calendar, Clock, Edit, List, Trash2 } from "react-feather";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

//** Other Imports */
import {
  addTask,
  deleteTask,
  editTask,
  getTasks,
} from "../../../actions/tasks.actions";

const Table = () => {
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
  const [tasks, setTasks] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (dateFilter.startDate !== "" && dateFilter.endDate !== "") {
      const filteredTasks = tasksList?.filter((item) => {
        return (
          new Date(item.date) >= new Date(dateFilter.startDate) &&
          new Date(item.date) <= new Date(dateFilter.endDate)
        );
      });
      setTasks(filteredTasks);
    } else {
      setTasks(tasksList);
    }
  }, [tasksList, dateFilter]);

  const [details, setDetails] = useState({
    name: "",
    date: "",
    time: "",
  });

  //** to show and hide edit modal */
  const [modalShow, setModalShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const modShowEdit = (id) => {
    setEditIndex(id);
    setModalShow(true);
    const filteredItem = tasks.filter((item) => item.id === id);
    setDetails(filteredItem[0]);
  };
  const modShowAdd = () => {
    setEditIndex(null);
    setModalShow(true);
    setDetails({
      name: "",
      date: "",
      time: "",
    });
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.id]: e.target.value,
    });
  };

  const deleteEmp = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (details.name !== "" && details.date !== "" && details.time !== "") {
      const data = {
        name: details.name,
        date: details.date,
        time: details.time,
      };
      dispatch(editTask(data, editIndex));
      setModalShow(false);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (details.name !== "" && details.date !== "" && details.time !== "") {
      const data = {
        id: Date.now(),
        name: details.name,
        date: details.date,
        time: details.time,
      };
      dispatch(addTask(data));
      setModalShow(false);
    }
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div>
          <Button
            onClick={() => modShowEdit(row.id)}
            variant="warning"
            size="sm"
          >
            <Edit size={16} />
          </Button>{" "}
          <Button onClick={() => deleteEmp(row.id)} variant="danger" size="sm">
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {editIndex !== null ? "Edit" : "Add"} Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="d-flex h-100 align-items-center justify-content-center"
            onSubmit={(e) =>
              editIndex !== null ? handleEdit(e) : handleAdd(e)
            }
          >
            <Row className="align-items-center justify-content-center">
              <Col sm={3}>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>
                    <Calendar size={16} />
                    &nbsp;Date
                  </Form.Label>
                  <Form.Control
                    required
                    value={details.date}
                    onChange={(e) => handleChange(e)}
                    type="date"
                    placeholder="Date"
                  />
                </Form.Group>
              </Col>
              <Col sm={7}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>
                    <List size={16} />
                    &nbsp;Name
                  </Form.Label>
                  <Form.Control
                    required
                    value={details.name}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
              </Col>
              <Col sm={2}>
                <Form.Group className="mb-3" controlId="time">
                  <Form.Label>
                    <Clock size={16} />
                    &nbsp;Time (Hr)
                  </Form.Label>
                  <Form.Control
                    required
                    value={details.time}
                    onChange={(e) => handleChange(e)}
                    type="number"
                    placeholder="Time (Hr)"
                  />
                </Form.Group>
              </Col>
              <Col
                sm={3}
                className="d-flex align-items-center justify-content-end mt-3"
              >
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Col>
              <Col
                sm={3}
                className="d-flex align-items-center justify-content-start mt-3"
              >
                <Button variant="danger" onClick={() => setModalShow(false)}>
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Fragment>
        <Card>
          <DataTable
            noHeader
            subHeader
            responsive
            columns={columns}
            data={tasks}
            className="react-dataTable"
            subHeaderAlign="left"
            subHeaderWrap
            subHeaderComponent={
              <div className="d-flex  justify-content-between w-100">
                <h3>Tasks</h3>
                <Form className="d-flex align-items-center justify-content-center">
                  <Form.Group className="mb-3 mx-1" controlId="start-date">
                    <Form.Label>
                      <Calendar size={16} />
                      &nbsp;Start Date
                    </Form.Label>
                    <Form.Control
                      required
                      value={dateFilter.startDate}
                      onChange={(e) =>
                        setDateFilter({
                          ...dateFilter,
                          startDate: e.target.value,
                        })
                      }
                      type="date"
                      placeholder="Date"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 mx-1" controlId="end-date">
                    <Form.Label>
                      <Calendar size={16} />
                      &nbsp;End Date
                    </Form.Label>
                    <Form.Control
                      required
                      value={dateFilter.endDate}
                      onChange={(e) =>
                        setDateFilter({
                          ...dateFilter,
                          endDate: e.target.value,
                        })
                      }
                      type="date"
                      placeholder="Date"
                    />
                  </Form.Group>
                </Form>
                <Button onClick={() => modShowAdd()} variant="success">
                  Add Task
                </Button>
              </div>
            }
          />
        </Card>
      </Fragment>
    </>
  );
};

export default Table;
