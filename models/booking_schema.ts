import { Schema, model, models } from "mongoose";

const booking_data = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    token_id: {
        type: String,
        required: true
    },
    slots: [{
        type: Object,
        required: true,
        default: {}
    }]
    
})

const bookingSchema = models.booking_data || model("booking_data", booking_data)

export default bookingSchema;