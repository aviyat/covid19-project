import React, { useEffect } from 'react';
import './menu.css'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
// import member from '../../../node_project/models/member';
import AddMember from './addMember';

function mapStateToProps(state) {
    return { member: state.member }
}

export default connect(mapStateToProps, null)(
    function Menu(props) {
        const { member, getMembers } = props
        useEffect(() => {
            console.log(member);
        }, [])

        return (
            <>

                <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>

                    <div className={"collapse navbar-collapse"} id="navbarNavDropdown">
                        <img
                            src="img\hospitalLogo3.jpg"
                            className="logo"
                            alt=" logo"
                        />
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                            <AddMember getMembers={getMembers}/>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        {/* <ul class="navbar-nav">
                          
                                <li className={"nav-item me-auto " }>
                                    <AddMember getMembers={getMembers}/>
                                    
                                </li>
                            </ul> */}

                    </div>
                </nav>






            </>


        )


    })

