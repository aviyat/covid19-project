import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useRef } from 'react';
import { createMember } from './service';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter, useHistory } from 'react-router-dom';
import './members.css'
import imgUrl from './image/profil2.jpg'

function mapStateToProps(state) {
    return {
        memberState: state.member
    }
}

const mapDispatcToProps = (dispatch) => ({
    updateMember: (member) => dispatch(createMember(member)),
})

export default withRouter(connect(mapStateToProps, mapDispatcToProps)(function AddVaccination(props) {
    const { getMembers } = props;
    const [show, setShow] = useState(false);
    const [amountDoses, setAmountDoses] = useState([1]);
    const [iDoses, setIDoses] = useState(2);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [url, setUrl] = useState();
    const [memberName, setMemberName] = useState();
    const [id, setId] = useState();
    const [adress, setAdress] = useState();
    const [bornDate, setBornDate] = useState();
    const [phone, setPhone] = useState();
    const [mobilePhone, setMobilePhone] = useState();
    const [DoseDate, setDoseDate] = useState();
    const [producerName, setproducerName] = useState();
    const [datePositiveResult, setdatePositiveResult] = useState();
    const [dateRecovery, setDateRecovery] = useState();
    const { updateMember, memberState } = props
    const [showVaccination, setshowVaccination] = useState();
    const [savedDose, setSavedDose] = useState(true);
    const [dateDose, setDateDose] = useState('');
    const [PDose, setPDose] = useState('');
    const [img, setImg] = useState(imgUrl);
    const [dosesArray, setDosesArray] = useState([]);
    // { date: new Date(), p: '' }

    const history = useHistory();
    const handleClickAddDose = () => {
        if (amountDoses.length < 4) {
            setIDoses(iDoses + 1);
            setAmountDoses([...amountDoses, iDoses])
            setSavedDose(true)

        }
        else {
            alert("The can't get more from 4 doses!!!!!!")
        }
    }
    const addDoseToArray = () => {
        debugger
        setDosesArray([...dosesArray, { date: dateDose, p: PDose }])
        setSavedDose(false)
    }

    function AddMember(e) {
        axios.post('http://localhost:3500/addMember', {
            // url: url,
            memberName: memberName,
            id: id,
            adress: adress,
            bornDate: bornDate,
            phone: phone,
            mobilePhone: mobilePhone,

        });
    }
    const AddMemberToDB = () => {
        AddMember();
        setshowVaccination(true);

    }
    const saveVaccinationDetails = async () => {
        debugger
        axios.post('http://localhost:3500/addVaccinattion', {
            memberId: id,
            dosesVaccination: dosesArray,
            datePositiveResult: datePositiveResult,
            dateRecovery: dateRecovery
        });
        setShow(false)
        history.push('/')
    }
    const onChangeHandlerImg = (event) => {
        const reader = new FileReader();
        const file = event;
        reader.onloadend = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(file);
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
    }
    return (
        <>

            <div style={{ cursor: 'pointer' }} className={"nav-link"} id={"add"} onClick={handleShow}><Button variant="light" size="lg">Add Member</Button></div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Member: </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className='package-img-div row' noValidate autoComplete="off" style={{
                        display: 'flex'
                    }}>
                        <label className='lable-upload-img' for="profileImg">
                            <div className='icon-add-img'>+ add image</div>
                            {img !== '' && <img className={img !== '' ? "package-img-img" : ''} referrerpolicy="no-referrer" src={img} />}
                        </label>
                        <input
                            type={"file"}
                            id="profileImg"
                            htmlFor="myInput"
                            accept="image/*"
                            style={{
                                display: 'none',
                                cursor: 'pointer'
                            }}
                            onChange={(e) => onChangeHandlerImg(e.target.files[0])}
                        /></form>

                    <br />
                    <div className="field">
                        <label className="label">Id: </label>
                        <input required
                            className="input"
                            type="Number"
                            placeholder="Enter Id Member"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Full Member Name: </label>
                        <input required
                            className="input"
                            type="text"
                            placeholder="Enter FirstName & LastName"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Born Date: </label>
                        <input required
                            className="input"
                            type="Date"
                            placeholder="Enter BornDate"
                            value={bornDate}
                            onChange={(e) => setBornDate(e.target.value)}
                        />
                        
                    </div>
                    <div className="field">
                        <label className="label">Adress: </label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter City,Street,and HomeNumber"
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />
                    </div>
                  
                    <div className="field">
                        <label className="label">Phone: </label>
                        <input
                            className="input"
                            type="Number"
                            placeholder="Enter phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Mobile-Phone:</label>
                        <input
                            className="input"
                            type="Number"
                            placeholder="Enter mobilePhone"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                        />
                    </div>


                    <Button onClick={() => { AddMemberToDB() }}>Save and show more details</Button><br></br>
                    <div>
                        {showVaccination &&
                            <>


                                {amountDoses && amountDoses.map((item, index) =>
                                    <>

                                        <Form.Label>Dose number {item} </Form.Label>
                                        Date: <Form.Control type='date' onChange={(e) => setDateDose(e.target.value)} />
                                        Manufacturer: <Form.Control type='text' onChange={(e) => setPDose(e.target.value)} /><br />
                                        <button onClick={() => addDoseToArray()}>save</button>

                                    </>
                                )}
                                <button disabled={savedDose} onClick={() => handleClickAddDose()}>+</button><br />
                                {/* DatePositiveResult:
                                <input
                                    className="input"
                                    type="Date"
                                    placeholder=""
                                    value={datePositiveResult}
                                    onChange={(e) => setdatePositiveResult(e.target.value)}
                                /> */}
                                DatePositiveResult:: <Form.Control type='Date' onChange={(e) => setdatePositiveResult(e.target.value)} />
                                {/* <input type='Date' onChange={(e) => setdatePositiveResult(e.target.value)} /> */}<br />
                                DateRecovery: <Form.Control type='Date' onChange={(e) => setDateRecovery(e.target.value)} />


                            </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveVaccinationDetails()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
))