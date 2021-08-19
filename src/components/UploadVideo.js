import React, { useEffect, useRef, useState } from 'react';
import openSocket from 'socket.io-client'
import { BASE_URL } from "../constants/api";
// const Delivery = require('delivery')
const fs = require('fs');
const SocketIOFileUpload = require('socketio-file-upload/client');

function UploadVideo() {
    // const socket = openSocket(BASE_URL + '/');
    const socketRef = useRef();
    const [dataUri, setDataUri] = useState('')

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    // socket.on("connect", () => {
    //     console.log("socket.id", socket.id); // x8WIv7-mJelg7on_ALbx
    // });



    const fileUpload = (file) => {
        console.log("<<<<<<<<<<<<<<<<<<,,", file)
        console.log("socketRef.current", socketRef.current)

        if (!file) {
            setDataUri('');
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                console.log("dataUri", dataUri)
                setDataUri(dataUri)
                socketRef.current.emit("file", dataUri)
            })


        // var uploader = new SocketIOFileUpload(socket)
        // console.log("KKKKKKKK", document.getElementById("siofu_input"))
        // uploader.listenOnInput(document.getElementById("siofu_input"));
        // console.log("uploader", uploader)

        // // Do something on upload progress:
        // uploader.addEventListener("progress", function (event) {
        //     var percent = event.bytesLoaded / event.file.size * 100;
        //     console.log("File is", percent.toFixed(2), "percent loaded");
        // });

        // // Do something when a file is uploaded:
        // uploader.addEventListener("complete", function (event) {
        //     console.log(event.success);
        //     console.log(event.file);
        // });

    }

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = openSocket(BASE_URL + '/')
    }, [])



    return (
        <div>
            <h1>UploadFile</h1>
            {/* <img width="200" height="200" src={dataUri} alt="avatar" /> */}
            <input type="file" class="form-control" onChange={(e) => fileUpload(e.target.files[0] || null)} />
        </div>
    )
}

export default UploadVideo
