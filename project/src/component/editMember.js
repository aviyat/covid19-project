
import React, { useState, useRef, useEffect } from 'react';
import { createMember } from './service';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import { updateMember } from './store/action';
import { addMember } from './store/action';
import Menu from './menu';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import imgUrl from './image/profil2.jpg'



// import member from '../../../WeatherProject/models/member';

// function mapStateToProps(state) {
//     return { 
//         memberState: state.member
//     }
// }

// const mapDispatcToProps = (dispatch) => ({

//     updateMember: (member) => dispatch(createMember(member)),

// })

// const history = useHistory();

//withRouter( connect(mapStateToProps, mapDispatcToProps)
export default function EditMember(props) {
    // const [url, setUrl] = useState();
    const [memberName, setMemberName] = useState("chaim");
    const [adress, setAdress] = useState();
    const [bornDate, setBornDate] = useState();
    const [phone, setPhone] = useState();
    const [mobilePhone, setMobilePhone] = useState();
    const [dosesArray, setDosesVaccination] = useState();
    const [datePositiveResult, setDatePositiveResult] = useState();
    const [dateRecovery, setDateRecovery] = useState();
    // const [memberHistory, setMemberHistory] = useState();
    // const { updateMember, memberState } = props
    const { history } = props;
    const { id } = useParams();
    const [show, setShow] = useState(true);
    const [img, setImg] = useState(imgUrl);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


 

    function updateMember(e) {
        // e.preventDefault();
        axios.patch(`http://localhost:3500/updateMember/${id}`, {

            // url: url,
            memberName: memberName,
            adress: adress,
            bornDate: bornDate,
            phone: phone,
            mobilePhone: mobilePhone,
          
        });
        history.push("/");
    }
    
    function updateVaccination(e) {
        // e.preventDefault();
        axios.patch(`http://localhost:3500/updateVaccination/${id}`, {

            dosesVaccination: dosesArray,
            datePositiveResult: datePositiveResult,
            dateRecovery: dateRecovery
        });
        history.push("/");
    }

    const hanldeCloseButton =()=>{
        handleClose()
    history.push('/')
       }
    

    useEffect(() => {
        getMemberById();
        getVaccinattionByMember();
    }, []);

       

const getVaccinattionByMember=async()=>{
const { data } = await axios.get(`http://localhost:3500/getVaccinattionByMember/${id}`)
console.log(data);
        debugger
setDosesVaccination(() => (data?.vaccinattion?.[0]?.dosesVaccination) ? data?.vaccinattion?.[0]?.dosesVaccination : "");
setDatePositiveResult(() => (data?.vaccinattion?.[0]?.datePositiveResult) ? data?.vaccinattion?.[0]?.datePositiveResult : "");
setDateRecovery(() => (data?.vaccinattion?.[0]?.dateRecovery) ? data?.vaccinattion?.[0]?.dateRecovery : "");


}

    async function getMemberById() {
        const { data } = await axios.get(`http://localhost:3500/getMemberById/${id}`);
        // console.log("res",res);
        // setUrl(() => (data?.myMember?.url) ? data?.myMember.url : "");
        setMemberName(() => (data?.myMember?.memberName) ? data?.myMember.memberName : "");
        setAdress(() => (data?.myMember?.adress) ? data?.myMember.adress : "");
        setBornDate(() => (data?.myMember?.bornDate) ? data?.myMember.bornDate : "");
        setPhone(() => (data?.myMember?.phone) ? data?.myMember.phone : "");
        setMobilePhone(() => (data?.myMember?.mobilePhone) ? data?.myMember.mobilePhone : "");
        // setMemberHistory(data.history);

    }
 
const setCurrentDosesdate=(value, index)=>{
    debugger
    let arr= dosesArray;
    arr[index].date=value;
    setDosesVaccination(arr);
}
const setCurrentDosesP=(value, index)=>{
    let arr= dosesArray;
    arr[index].p=value;
    setDosesVaccination(arr);
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
      
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Member Details</Modal.Title>
                </Modal.Header>
                <Modal.Body class="show-grid">
                <Container>
            <Row>
              <Col xs={12} md={6}>
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
                    
                    <div className="field">
                        <label className="label">Member Name: </label>
                        <input
                            className="input"
                            type="text"
                            placeholder="memberName"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Born Date: </label>
                        <input
                            className="input"
                            type="date"
                            placeholder="bornDate"
                            value={bornDate}
                            onChange={(e) => setBornDate(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Adress: </label>
                        <input
                            className="input"
                            type="text"
                            placeholder="adress"
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Phone: </label>
                        <input
                            className="input"
                            type="Number"
                            placeholder="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        
                    </div>
                    <div className="field">
                        <label className="label">Mobile-Phone:</label>
                        <input
                            className="input"
                            type="Number"
                            placeholder="mobilePhone"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                        />
                    </div> 
                    </Col>
              <Col xs={12} md={6}>
                    
              <div className="field">
                        <label className="label">Doses Vaccination:</label><br/>
                        {Array.isArray(dosesArray)&&dosesArray?.map((item, index)=>
                        <>    
                        DateDose: <br/><input
                        className="input"
                        type="date"
                        placeholder="dateDose"
                         value={item?.date}
                        onChange={(e) => setCurrentDosesdate(e.target.value, index)}
                    /><br/>
                          Manufacturer: <input
                           className="input"
                           type="text"
                           placeholder="ManufacturerDose"
                            value={item?.p}
                           onChange={(e) => setCurrentDosesP(e.target.value, index)}
                        
                       />   <br/>
                       </>
                            )}
                     
                    </div>
                    <div className="field">
                        <label className="label">Date Positive Result: </label>
                        <input
                            className="input"
                            type="Date"
                            placeholder="img"
                            value={datePositiveResult}
                            onChange={(e) => setDatePositiveResult(e.target.value)}
                        />
                     
                    </div>

                    <div className="field">
                        {/* {dateRecovery} */}
                        <label className="label">Date Recovery :</label>
                        <input
                            className="input"
                            type="date"
                            placeholder="dateRecovery"
                            value={dateRecovery}
                            onChange={(e) => setDateRecovery(e.target.value)}
                        />
                    </div>

                    <div>
                        
                    </div>
                    
              </Col>

           </Row>
              </Container>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={hanldeCloseButton}>
                        Close
                    </Button>
                  
                    <Button variant="primary" onClick={() => {
          updateMember();
          updateVaccination();
        }} >
           
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    </>
  );
}

