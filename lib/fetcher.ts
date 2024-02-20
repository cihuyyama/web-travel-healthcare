import axios from "axios";

const fetcher = (url: string) => axios.get(url,{
    headers:{
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJleHAiOjE3MDg0MDE4NzR9.dXCEKpdjJOVbMdGeN9qtdFPM7dJBuk4HvsmKSoKB0XE`
    }
}).then((res)=>res.data)

export default fetcher