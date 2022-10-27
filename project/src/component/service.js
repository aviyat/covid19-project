import axios from 'axios'
// import member from '../../../WeatherProject/models/member';

export function createMember(member) {
    
    axios.post("http://localhost:3500/addMember", member)
        .then(res => { console.log('create member succses:', JSON.stringify(res)); })
        .catch(err => { console.log('err:', err); })
}

export async function getAllMembers() {
    
    let data = await axios.get("http://localhost:3500/getAllMembers");
    return data;
}
export async function deleteMembers() {
    
    let data = await axios.delete("http://localhost:3500/deleteMember/:id");
    return data;
}
export async function updateMember() {
    
    let data = await axios.patch("http://localhost:3500/updateMember/:id");
    return data;
}
export async function getMemberById() {
    debugger
    let data = await axios.get("http://localhost:3500/getMemberById/:id");
    return data;
}

