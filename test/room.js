process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Room = require('../models/room');
let Hotel = require('../models/hotel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Rooms', () => {
    beforeEach((done) => { //Before each test we empty the database
        Room.remove({}, (err) => {
            done();
        });
    });

    // Test the /GET route
    describe('GET room', () => {
        it('it should GET all the Rooms', (done) => {
            chai.request(server)
                .get('/api/room')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(0);
                    done();
                });
        });
    });


    // Test the /GET/:id route
    describe('GET room/:id', () => {
        it('it should GET a room by the given id', (done) => {
            let hotel = new Hotel({
                name: "Hilton Hotel", address: '123 Sydney Road', city: 'Sydney', country: 'Australia', description: "Luxury hotel located in the heart of the city", img: 'assets/images/hilton-01.jpg'
            });
            let room = new Room({
                name: 'Standard room', hotel: hotel, maxGuest: 4, bedrooms: 2, price: 100,
                images: [
                    "assets/images/hilton-room-01.jpg", "assets/images/hilton-room-02.jpg", "assets/images/hilton-02.jpg", "assets/images/hilton-02.jpg"
                ]
            });

            room.save((err, room) => {
                chai.request(server)
                    .get('/api/room/' + room.id)
                    .send(room)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('hotel').eql(hotel.id)
                        res.body.should.have.property('_id').eql(room.id);
                        res.body.should.have.property('name');
                        res.body.should.have.property('maxGuest');
                        res.body.should.have.property('bedrooms');
                        res.body.should.have.property('price');

                        done();
                    });
            });

        });
    });


    // Test the /GET/:id/?room=id route
    describe('GET room?hotel=id', () => {
        it('it should GET all rooms for specific hotel', (done) => {

            const hotels = [
                Hotel({
                    name: "Hilton Hotel", address: '123 Sydney Road', city: 'Sydney', country: 'Australia', description: "Luxury hotel located in the heart of the city", img: 'assets/images/hilton-01.jpg'
                }),
                Hotel({
                    name: 'Sydney backpackers', address: '1 hat Road', city: 'Sydney', country: 'Australia', description: "Budget pricing and central location", img: 'assets/images/sydney-yha-01.jpg'
                })
            ];

            const rooms = [
                Room({
                    name: 'Standard room', hotel: hotels[0], maxGuest: 4, bedrooms: 2, price: 100,
                    images: [
                        "assets/images/hilton-room-01.jpg", "assets/images/hilton-room-02.jpg", "assets/images/hilton-02.jpg", "assets/images/hilton-02.jpg"
                    ]
                }),
                Room({
                    name: 'Standard room 2', hotel: hotels[0], maxGuest: 4, bedrooms: 2, price: 100,
                    images: [
                        "assets/images/hilton-room-01.jpg", "assets/images/hilton-room-02.jpg", "assets/images/hilton-02.jpg", "assets/images/hilton-02.jpg"
                    ]
                }),
                Room({
                    name: 'Delux Suite', hotel: hotels[1], maxGuest: 8, bedrooms: 4, price: 150,
                    images: [
                        "assets/images/hilton-room2-01.jpg", "assets/images/hilton-room2-02.jpg", "assets/images/hilton-02.jpg", "assets/images/hilton-02.jpg"
                    ]
                }),
            ];

            Room.insertMany(
                rooms,
                (err, hotel) => {
                    chai.request(server)
                        .get('/api/room?hotel=' + hotels[0].id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body[0].should.have.property('_id');
                            res.body[0].should.have.property('name');
                            res.body[0].should.have.property('price');
                            res.body[0].hotel.should.equal(hotels[0].id);
                            res.body[0].name.should.equal(rooms[0].name);
                            res.body.should.have.lengthOf(2);
                            done();
                        });
                }
            );

        });
    });


});