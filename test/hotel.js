process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Hotel = require('../models/hotel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Hotels', () => {
    beforeEach((done) => { //Before each test we empty the database
        Hotel.remove({}, (err) => {
            done();
        });
    });

    // Test the /GET route
    describe('GET hotel', () => {
        it('it should GET all the Hotels', (done) => {
            chai.request(server)
                .get('/api/hotel')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    // Test the /GET/:id route
    describe('GET hotel/:id', () => {
        it('it should GET a hotel by the given id', (done) => {
            let hotel = new Hotel({
                name: "Hilton Hotel", address: '123 Sydney Road', city: 'Sydney', country: 'Australia',
                description: "Luxury hotel located in the heart of the city", img: 'assets/images/hilton-01.jpg'
            });
            hotel.save((err, hotel) => {
                chai.request(server)
                    .get('/api/hotel/' + hotel.id)
                    .send(hotel)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('address');
                        res.body.should.have.property('city');
                        res.body.should.have.property('country');
                        res.body.should.have.property('_id').eql(hotel.id);
                        done();
                    });
            });

        });
    });


});