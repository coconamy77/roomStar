var express = require('express');
var http = require('http');

var express = require('express')
var app = express()
var http = require('http').Server(app)
http.listen(8210, () => {
    console.log("Server Running at http://127.0.0.1:8210")
})

const cors = require('cors')
app.use(cors())
var io = require('socket.io')(http)


let rooms = {};

// 소켓 서버의 이벤트를 연결
io
    .sockets
    .on('connection', function (socket) {

        let study_id = socket.handshake.query.study_id;
        let user_id = socket.handshake.query.user_id;

        console.log(study_id, '   ', user_id);
        console.log("asdfadsf", study_id, user_id);

        // study_id = data.study_id;
        // user_id = data.user_id;
        // let user_nickName = data.user_nickName;

        // console.log("들어간다 ", study_id);

        //방 찾기
        let room = rooms.study_id;

        let user_num;
        let user;

        //join 
        if (room) {
            //방이 존재 할때
            if (room.member_cnt >= 6) {
                return;
            }
            room
                .members
                .push(user_id);

            room
                .sockets
                .push(socket);

            room.member_cnt += 1;
            user_num = room.member_cnt;
            user = 'user ' + user_num;

        } else {
            console.log('room created');

            //존재하지 않을때
            user = 'user 1'

            room = {
                members: [user_id],
                sockets: [socket],
                member_cnt: 1
            }
            rooms.study_id = room;
            user_num = 1;
        }
        
        socket.join(study_id);
        
        console.log('111111111111111111', user_id)
        
        io
            .sockets
            .to(study_id)
            .emit('join', {
                user: user,
                user_id: user_id,
                user_num: user_num,
                members: room.members,
                member_cnt: room.member_cnt
            });
            
            
            socket.on('abc', function (data) {
                
                study_id = data.study_id;
                user_id = data.user_id;
                let user_nickName = data.user_nickName;
                
                console.log("asdfadsf", study_id, user_id, user_nickName);
                console.log("들어간다 ", study_id);



            //방 찾기
            let room = rooms.study_id;

            let user_num;
            let user;

            //join 
            if (room) {
                //방이 존재 할때
                if (room.member_cnt >= 6) {
                    return;
                }
                room
                    .members
                    .push(user_id);

                room
                    .sockets
                    .push(socket);

                room.member_cnt += 1;
                user_num = room.member_cnt;
                user = 'user ' + user_num;

            } else {
                console.log('room created');

                //존재하지 않을때
                user = 'user 1'

                room = {
                    members: [user_id],
                    sockets: [socket],
                    member_cnt: 1
                }
                rooms.study_id = room;
                user_num = 1;
            }

            socket.join(study_id);
            io
                .sockets
                .to(study_id)
                .emit('join', {
                    user: user,
                    user_id: user_id,
                    user_num: user_num,
                    members: room.members,
                    member_cnt: room.member_cnt
                });
        });

        socket.on('disconnect', function (data) {
            // socket_id = socket.id;

        });

        socket.on('leave', function (data) {
            console.log(data, 'leave')
            let study_id = 1;
            let user_id = data.user_id;
            let socket_id = socket.id;

            let room = rooms.study_id;
            if (room.member_cnt == 1) {
                delete rooms.study_id;

                console.log('room destroy');


            } else {
                room.members = room.members.filter(member => (member != user_id))
                room.sockets = room.sockets.filter(socket => (socket.id != socket_id))

                let user_num = room.member_cnt;
                room.member_cnt -= 1;


                io.sockets.to(study_id).emit('leave', {
                    user_id: user_id,
                    user_num: user_num
                });
            }
            //이후 방과 아이디로 방을 찾아 관리

        })

        //보드
        socket.on('draw', function (data) {
            let study_id = 1;
            io
                .sockets
                .to(study_id)
                .emit('line', data);
        });

        socket.on('clear', function (data) {

            let study_id = 1;
            io
                .sockets
                .to(study_id)
                .emit('clear', data);
        });


        socket.on('send message', function (data) {
            // console.log(1);

            // console.log(data);
            console.log("보낸다", data);

            let message = data.message;
            let study_id = data.study_id;


            io
                .sockets
                .to(study_id)
                .emit('receive message', data);


        });

        //화상채팅
        socket.on('message', data => {
            let study_id = 1;
            let t_socket;
            const idx = rooms.study_id.members.indexOf(`${data.to}`)

            t_socket = rooms.study_id.sockets[idx]
            // console.log(rooms.study_id.sockets)

            t_socket.emit('message', data)
        })

        //노트패드
        socket.on('typing', data => {
            console.log("typing...");
            console.log(data);

            let study_id = data.study_id;
            socket
                .broadcast
                .to(study_id)
                .emit('typing', data);
        })

        //화면공유
        socket.on('viewshare', data => {
            let study_id = 1;

            socket.broadcast.to(study_id).emit('viewshare', data)

        })
    });

