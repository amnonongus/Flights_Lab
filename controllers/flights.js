const { resolveInclude } = require('ejs');
const res = require('express/lib/response');
const Flight = require('../models/flight');






function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights: flights,
            title: "All Flights",
        })
    })
}

function newFlight(req, res) {
    res.render('flights/new', {
        title: "Add Flight"
    })
    
}

function create(req, res) {
    const flight = new Flight(req.body);
    console.log(req)
    flight.save(function(err){
        if(err) {
            console.log(err);
            return res.redirect('/flights/new');
        }
        res.redirect('/flights');
    })
}


async function show(req, res) {
    console.log(req.params.id)
    const flight = await Flight.findById(req.params.id)
     .populate('destinations')
        console.log(flight)
        res.render('flights/show', {
            flight: flight,
            title: "Flight Details"
        })
}






module.exports = {
    index,
    new: newFlight,
    create,
    show
};