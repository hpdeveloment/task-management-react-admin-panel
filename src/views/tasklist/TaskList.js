import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { connect } from 'react-redux';
import { toDoListData } from '../../redux/actions';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { initializeConnect } from 'react-redux/es/components/connect';

const Tables = (props) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    const task = localStorage.getItem('taskData');
    
    // check localStorage when initialize list
    if(task != null) {
      const storedTaskData = JSON.parse(task);
      props.toDoListData(storedTaskData);
    } else {
      const taskData = [
        { id: 1, name: 'task1', description: 'Lorem Ipsom provide details', due_date: '13/11/2002', Assignee: 'new Joiner', status: '1' },
      ];
      const taskDataJSON = JSON.stringify(taskData);
      localStorage.setItem('taskData', taskDataJSON);
  
      const storedTaskDataJSON = localStorage.getItem('taskData');
      const storedTaskData = JSON.parse(storedTaskDataJSON);
      props.toDoListData(storedTaskData);
    }
  }, []);

  // Action When Delete Task
  const handleClick = (taskId) => {
    const text = "Are you sure to delete this task.";
    if (window.confirm(text)) {
      const storedTaskDataJSON = localStorage.getItem('taskData');
      let storedTaskData = JSON.parse(storedTaskDataJSON);
  
      const taskIndex = storedTaskData.findIndex(task => task.id === taskId);
  
      if (taskIndex !== -1) {
        storedTaskData.splice(taskIndex, 1);

        localStorage.setItem('taskData', JSON.stringify(storedTaskData));
  
        props.toDoListData(storedTaskData);
      }
    }
  };

  // Callback for close the add task modal
  const handleClose = (status) => {
    setVisible(status);
  }

  // Callback for close the Edit task modal
  const EditHandleClose = (status) => {
    setEditVisible(status);
  }

  // Call function for edit the task
  const handleEditTask = (id) => {
    setEditVisible(true);
    setEditId(id);
  }

  return (
    <>
      {/* Add Task Componant */}
      <AddTask visiblity={visible} close={(e) => handleClose()} />

      {/* Edit Task Componant */}
      <EditTask id={editId} visiblity={editVisible} close={(e) => EditHandleClose()} />

      {/* Task List Componant */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Todo List Table</strong>
              <button className="btn btn-primary btn-sm" onClick={() => setVisible(true)}>Add Task</button>
            </CCardHeader>
            <CCardBody id="todotable">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">S. No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Due Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Assignee</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {props.toDoList != "" ? 
                    props.toDoList.map((task) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row">{task.id}</CTableHeaderCell>
                        <CTableDataCell>{task.name}</CTableDataCell>
                        <CTableDataCell>{task.description}</CTableDataCell>
                        <CTableDataCell>{task.due_date}</CTableDataCell>
                        <CTableDataCell>{task.Assignee}</CTableDataCell>
                        <CTableDataCell>
                          <span className={`badge ${task.status == 1 ?  'bg-dark' : task.status == 2 ?  'bg-warning' : task.status == 3 ?  'bg-danger' : 'bg-primary'}`}>{task.status == "1" ? "To Do" : task.status == "2" ? "In Progress" : task.status == "3" ? "Done" : "null" }</span>
                        </CTableDataCell>
                        <CTableDataCell><button className="btn btn-success btn-sm mb-1" onClick={(e) => handleEditTask(task.id)}>Edit</button>&nbsp;<button className="btn btn-danger btn-sm mb-1" onClick={(e) => handleClick(task.id)}>Delete</button></CTableDataCell>
                      </CTableRow>
                    )})
                    : <CTableRow>
                        <CTableDataCell scope="col" colSpan={7}>{'No Tesk found currently'}</CTableDataCell>
                      </CTableRow>
                  }
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    toDoList: state.toDoList.todoListData,
  };
};

const mapDispatchToProps = {
  toDoListData: (taskData) => toDoListData(taskData),
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
