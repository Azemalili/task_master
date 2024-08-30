import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function DeleteList({deleteList, showDeleteModal, closeDeleteModal}) {


  return (
    <>
     <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: '30px'}}>Deleting this list is a <b>permanent action</b>. Once deleted, the list and all its associated tasks will be permanently removed from your account, and this change cannot be undone. Please confirm if you're sure you want to proceed.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteModal}>
                Close
            </Button>
            <Button variant="primary" onClick={deleteList}>
                Delete list
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
