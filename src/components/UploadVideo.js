import React from 'react';
import openSocket from 'socket.io-client'
import { BASE_URL } from "../constants/api";
// const Delivery = require('delivery')
const fs = require('fs');

function UploadVideo() {
    const socket = openSocket(BASE_URL + '/');
    // client-side
    // socket.on("connect", (socket) => {
    //     console.log("socket.id", socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    // socket.emit('chat', "hellow world");
    // const fileUpload = (e) => {

    //     console.log(e.target.files[0])
    //     socket.emit('file', { name: `video_${Date.now()}`, Data: e.target.files[0] });
    // }
    // let FReader = new FileReader();


    // FReader = new FileReader();

    // socket.on('connect', function () {
    //     var delivery = new Delivery(socket);

    socket.on('connect', function () {
        // var delivery = new Delivery(socket);
        console.log("connectedLLLLLLL", socket.id)
        // delivery.on('delivery.connect', function (delivery) {

        // var file = e.target.files[0]
        // var extraParams = { name: `video_${Date.now()}` };
        // delivery.send(file, extraParams);
        // e.preventDefault();

        // });
        // console.log(e.target.files[0])
        // socket.emit('file', { name: `video_${Date.now()}`, Data: e.target.files[0] });
        // delivery.on('send.success', function (fileUID) {
        //     console.log("file was successfully sent.");
        // });
    });



    const fileUpload = (e) => {
        socket.on('connect', function () {
            // var delivery = new Delivery(socket);
            // delivery.on('delivery.connect', function (delivery) {

            //     var file = e.target.files[0]
            //     var extraParams = { name: `video_${Date.now()}` };
            //     delivery.send(file, extraParams);
            //     e.preventDefault();

            // });
            // // console.log(e.target.files[0])
            // // socket.emit('file', { name: `video_${Date.now()}`, Data: e.target.files[0] });
            // delivery.on('send.success', function (fileUID) {
            //     console.log("file was successfully sent.");
            // });
        });
    }





    return (
        <div>
            <h1>UploadFile</h1>
            <input type="file" class="form-control" onChange={fileUpload} />
        </div>
    )
}

export default UploadVideo
