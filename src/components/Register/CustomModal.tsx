import { Button, ButtonGroup, Paper, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CustomModal.css'
import { multiStepContext } from './StepContext';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
type Props = {
  modalOpen: boolean,
  setModalOpen: any,
  modalData?: any,
  setModalData?: any;
}

const CustomModal = ({ modalOpen, setModalOpen, modalData, setModalData }: Props) => {

  const [isEditable, setIsEditable] = useState(false);
  const { editData, deleteData } = useContext(multiStepContext);
  const [deleteClass, setDeleteClass] = useState(false)



  return (
    <div className='modal-container' >
      <Modal isOpen={modalOpen} className={`custom-modal ${deleteClass ? 'deleteClass' : ''} `}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        contentLabel="Custom Modal">
        <h3>Data for <span style={{ color: 'red' }}>{modalData?.id}</span></h3>
        <div className={`modal_text_fields ${deleteClass ? 'deleteClass' : ''}`} >
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <span style={{ textAlign: 'left' }}>
              {isEditable && "Edit the fields"}
            </span>
            <span className='cancelModal' onClick={() => setModalOpen(false)}>&times;</span>
          </div>

          <TextField className="filled-basic" value={modalData?.firstname} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, firstname: e.target.value }))} label="First Name" variant="filled" />
          <TextField className="filled-basic" value={modalData?.lastname} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, lastname: e.target.value }))} label="Last Name" variant="filled" />
          <TextField className="filled-basic" value={modalData?.email} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, email: e.target.value }))} label="Email" variant="filled" />
          <TextField className="filled-basic" value={modalData?.country} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, country: e.target.value }))} label="Country" variant="filled" />
          <TextField className="filled-basic" value={modalData?.city} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, city: e.target.value }))} label="City" variant="filled" />
          <TextField className="filled-basic" value={modalData?.landmark} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, landmark: e.target.value }))} label="Landmark" variant="filled" />
          <TextField className="filled-basic" value={modalData?.pincode} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, pincode: e.target.value }))} label="Pincode" variant="filled" />
          <TextField className="filled-basic" value={modalData?.contact} InputProps={{ readOnly: !isEditable }} onChange={(e) => setModalData((prev: any) => ({ ...prev, contact: e.target.value }))} label="Contact" variant="filled" />

        </div>
        <div className="actions" style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: 'fit-content', padding: '10px', margin: '10px' }}>
          {
            isEditable ? (
              <Button startIcon={<DoneOutlineIcon />} color='primary' variant='contained' onClick={() => {
                setIsEditable(!isEditable)
                editData(modalData?.id)
              }}>
                Update
              </Button>
            ) : (
              <Button startIcon={<EditIcon />} variant='contained' color='primary' onClick={() => {
                setIsEditable(!isEditable)
              }}>Edit</Button>
            )
          }

          {
            isEditable ? (
              <Button onClick={() => setIsEditable(!isEditable)}>Cancel</Button>
            ) : (
              <Button endIcon={<DeleteIcon />} variant="contained" style={{ background: 'red' }} color="secondary" onClick={() => {
                console.log(modalData);
                // setDeleteClass(!deleteClass);
                deleteData(modalData?.id)
              }}>
                Delete
              </Button>
            )
          }

        </div>
      </Modal >
    </div >
  )
}

export default CustomModal