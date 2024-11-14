import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Heading from '../minor/Heading';
import { Divider, FormControl, FormGroup, Paper } from '@mui/material';
import InputTypes from '../minor/InputTypes';
import CategoryDropdown from './CategoryDropdown';
import PrimaryButton from '../minor/PrimaryButton';
import UseTextEditor from '../major/TextEditor';
import StatusDropdown from './StatusDropDown';
import UserDropDown from './UserDropDown';
import UploadButton from '../minor/UploadButton';
import Software from './../../components/admin/Software';
import useSoftware from '../../hooks/useSoftware';
import useVersion from '../../hooks/useVersion';
import { MdOutlineFilePresent } from "react-icons/md";


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #eee',
    boxShadow: 24,
    p: 4
  };

const AddVersionModel = ({parent,onSuccess}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [versionDataToAdd, setVersionDataToAdd] = useState({
      parent:parent,
      name: '',
      status: '',
      information: '',
      downloadUrl: [],
      installUrl: [],

    })
    const {software, fetchSoftware} = useSoftware()
    const {addVersion} = useVersion()
    useEffect(()=>{
       fetchSoftware()
    },[])
    const handleSubmit = async () => {
      await addVersion(versionDataToAdd, handleClose);
        if (onSuccess) {
          onSuccess();
        
      }
    };
  return (
    <>
      <Button className='info-btn' onClick={handleOpen}><MdOutlineFilePresent /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Heading className="mb-5" heading="Add Software Version" />
            <Divider />
            <Paper className='mt-20' elevation={0}>
              <FormGroup className='d-flex model-from-style'>
                <FormControl className='from-controll'>
                  <InputTypes value={versionDataToAdd?.name} setValue={setVersionDataToAdd} label="name" id="standard-basic" className="" type="text" variant="standard" placeholder="Enter Version Name" />
                </FormControl>

                <FormControl className='from-controll'>
                  <CategoryDropdown options={software} value={versionDataToAdd?.parent?._id || parent?._id || ""} label="parent" setValue={setVersionDataToAdd} id="" className="margin-none" title="Select Software" />
                </FormControl>

                <FormControl className='from-controll'>
                    <StatusDropdown options={['available', 'unavailable', 'deprecated']} value={versionDataToAdd?.status || ""} setValue={setVersionDataToAdd} label="status" title="Select Status" />
                </FormControl>

                <FormControl className='from-controll'>
                  <UseTextEditor value={versionDataToAdd} setValue={setVersionDataToAdd} label="information" />
                </FormControl>

                <FormControl className='from-controll'>
                    <div className='d-flex ai-center cj-center'>
                        <UploadButton label="downloadUrl" value={versionDataToAdd?.downloadUrl} setValue={setVersionDataToAdd} title="Download File" onClickHander="" className="" />&nbsp;
                        <UploadButton label="installUrl" value={versionDataToAdd?.installUrl} setValue={setVersionDataToAdd} title="Install File" onClickHander="" className="" />
                    </div>
                </FormControl>

                <Divider className='mb-20' />

                <FormControl className='from-controll d-flex text-center ai-center cj-center mt-20'>
                  <div className='d-flex gap-10'>
                    <PrimaryButton variant="contained" title="Submit" size="medium" onClickHandler={()=>handleSubmit()} className="btn-ws-100"></PrimaryButton>
                    <PrimaryButton variant="contained" title="Cancel" size="medium" onClickHandler={()=>handleClose()} className="btn-ws-100"></PrimaryButton>
                  </div>
                </FormControl>
            </FormGroup>
            </Paper>
        </Box>
      </Modal>
    </>
  )
}

export default AddVersionModel