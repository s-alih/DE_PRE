const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../src/app')

test('Should sign in user', async (done) => {
    await request(app)
        .post('/addUsers')
        .send({
            "name":"salih",
            "phone":"1234567",
            "password":"1234",
            "address":{
                "city":"cherpulassery",
                "state":"Kerala",
                "district":"Palakkad",
                "zipcode":"1234"
            }
        })
        .expect(201)

        done()
})