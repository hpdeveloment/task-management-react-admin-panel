import React, { useEffect, useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react';
import { connect } from 'react-redux';
import { toDoListData } from '../../redux/actions';

const EditTask = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    due_date: '',
    Assignee: '',
    status: '',
  });

  useEffect(() => {
    // Finding data by id 
    const taskId = props.id;
    const storedTaskDataJSON = localStorage.getItem('taskData');
    const storedTaskData = JSON.parse(storedTaskDataJSON) || [];

    const selectedTask = storedTaskData.find((task) => task.id === taskId);
    
    if (selectedTask) {
      setFormData({
        name: selectedTask.name || '',
        description: selectedTask.description || '',
        due_date: selectedTask.due_date || '',
        Assignee: selectedTask.Assignee || '',
        status: selectedTask.status || '',
      });
    }
  }, [props.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Call function edit the task
  const handleEditTask = () => {
    const taskId = props.id;

    const storedTaskDataJSON = localStorage.getItem('taskData');
    const storedTaskData = JSON.parse(storedTaskDataJSON);

    const taskIndex = storedTaskData.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      storedTaskData[taskIndex] = {
        ...storedTaskData[taskIndex],
        name: formData.name,
        description: formData.description,
        due_date: formData.due_date,
        Assignee: formData.Assignee,
        status: formData.status,
      };

      localStorage.setItem('taskData', JSON.stringify(storedTaskData));
      
      props.toDoListData(storedTaskData);

      props.close(true);
    };
  }

  // For call the callback function to close the modal
  const handleclose = (status) => {
    props.close(status);
  };

  return (
    <>
      <CModal
        scrollable
        visible={props.visiblity}
        onClose={(e) => handleclose(true)}
        aria-labelledby="ScrollingLongContentExampleLabel3"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel3">Edit Task</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel>Title</CFormLabel>
              <CFormInput type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Due Date</CFormLabel>
              <CFormInput type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Assignee</CFormLabel>
              <CFormInput type="text" name="Assignee" value={formData.Assignee} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Status</CFormLabel>
              <CFormSelect name="status" value={formData.status} onChange={handleInputChange}>
                <option>Select status</option>
                <option value="1">To Do</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </CFormSelect>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={(e) => handleclose(true)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleEditTask}>
            Edit Task
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

const mapDispatchToProps = {
  toDoListData: (taskData) => toDoListData(taskData),
};

export default connect(null, mapDispatchToProps)(EditTask);
