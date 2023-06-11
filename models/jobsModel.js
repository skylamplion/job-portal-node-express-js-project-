import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'company name required']
    },
    position: {
        type: String,
        required: [true, 'job position is required'],
        maxLength: 100
    },
    description: {
        type: String,
        minLength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview']
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'Mumbai'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })
export default mongoose.model('Job', jobSchema)