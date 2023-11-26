  import React, {useState} from 'react'
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
    CFormSelect 
  } from '@coreui/react'
  import { connect } from 'react-redux';
  import { toDoListData } from '../../redux/actions';
import { initializeConnect } from 'react-redux/es/components/connect';

  const AddTask = (props) => {
    
    // initialize the state
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      dueDate: '',
      assignee: '',
      status: '',
    });

    // Store form value in state onchange
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // Add Task Action
    const handleAddTask = () => {
      const { title, description, dueDate, assignee, status } = formData;

      if (!title || !description || !dueDate || !assignee || !status) {
        alert("Please fill in all the fields");
        return;
      }

      const storedTaskDataJSON = localStorage.getItem('taskData');
      let storedTaskData = JSON.parse(storedTaskDataJSON) || [];
    
      const newTask = { id: storedTaskData.length + 1, name: title, description: description, due_date: dueDate, Assignee: assignee, status: status };
      storedTaskData.push(newTask);
    
      localStorage.setItem('taskData', JSON.stringify(storedTaskData));

      props.toDoListData(storedTaskData);
    
      props.close(status);
    };

    // For call the callback function to close the modal
    const handleclose = (status) => {
      props.close(status);
    }

    return (
      <>
        <CModal
          scrollable
          visible={props.visiblity}
          onClose={(e) => handleclose(true)}
          aria-labelledby="ScrollingLongContentExampleLabel2"
        >
          <CModalHeader>
            <CModalTitle id="ScrollingLongContentExampleLabel2">Add New Task</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel>Title</CFormLabel>
                <CFormInput type="text" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <CFormLabel>Description</CFormLabel>
                <CFormTextarea rows={3} name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <CFormLabel>Due Date</CFormLabel>
                <CFormInput type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Assignee</CFormLabel>
                <CFormInput type="text" name="assignee" value={formData.assignee} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Status</CFormLabel>
                <CFormSelect name="status" value={formData.status} onChange={handleChange}>
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
            <CButton color="primary" name="submit" onClick={handleAddTask}>Add Task</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }

  const mapDispatchToProps = {
    toDoListData: (taskData) => toDoListData(taskData),
  };

  export default connect(null, mapDispatchToProps)(AddTask);
