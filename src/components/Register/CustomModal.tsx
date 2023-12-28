import { Button, ButtonGroup, Paper, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './CustomModal.css'
import { multiStepContext } from './StepContext';
type Props = {
  modalOpen: boolean,
  setModalOpen: any,
  modalData?: any,
  setModalData?: any;
} 

const CustomModal = ({ modalOpen, setModalOpen, modalData, setModalData }: Props) => {

  const [isEditable, setIsEditable] = useState(false);
  const{editData,deleteData}=useContext(multiStepContext);


  return (
    <div className='modal-container'>
      <Modal isOpen={modalOpen} className='custom-modal'
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        contentLabel="Custom Modal">
        <h3>Data for <span style={{ color: 'red' }}>{modalData?.id}</span></h3>
        <div>
          <span className='cancelModal' onClick={() => setModalOpen(false)}>&times;</span>

          <TextField className="filled-basic" value={modalData?.firstname} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, firstname: e.target.value }))} label="First Name" variant="filled" />
          <TextField className="filled-basic" value={modalData?.lastname} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, lastname: e.target.value }))} label="Last Name" variant="filled" />
          <TextField className="filled-basic" value={modalData?.email} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, email: e.target.value }))} label="Email" variant="filled" />
          <TextField className="filled-basic" value={modalData?.country} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, country: e.target.value }))} label="Country" variant="filled" />
          <TextField className="filled-basic" value={modalData?.city} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, city: e.target.value }))} label="City" variant="filled" />
          <TextField className="filled-basic" value={modalData?.landmark} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, landmark: e.target.value }))} label="Landmark" variant="filled" />
          <TextField className="filled-basic" value={modalData?.pincode} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, pincode: e.target.value }))} label="Pincode" variant="filled" />
          <TextField className="filled-basic" value={modalData?.contact} contentEditable={isEditable} onChange={(e) => setModalData((prev: any) => ({ ...prev, contact: e.target.value }))} label="Contact" variant="filled" />

        </div>
        <div className="actions" style={{ display: 'flex', flexDirection: 'row',gap:'10px', width: 'fit-content', padding: '10px', margin: '10px' }}>
          <Button startIcon={<EditIcon />} color='primary' variant='contained' onClick={() => { 
            setIsEditable(!isEditable)
            editData(modalData?.id)
             }}>
            {isEditable ? "Update" : "Edit"}
          </Button>
          <Button endIcon={<DeleteIcon/>} variant="contained" color="secondary" onClick={()=>{
            console.log(modalData);
            deleteData(modalData?.id)
            }}>
            Secondary
          </Button>
        </div>
      </Modal >
    </div >
  )
}

export default CustomModal