const { resolveInclude } = require('ejs');
const res = require('express/lib/response');
const methodOverride = require('method-override');
const Flight = require('../models/flight');

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        })
    })
}




module.exports = {
    create
}



