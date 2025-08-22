import { Schema, model, models } from "mongoose";

const cancelled_data = new Schema({
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
    booked_on: {
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

const cancelledSchema = models.cancelled_data || model("cancelled_data", cancelled_data)

export default cancelledSchema;