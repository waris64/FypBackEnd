import recordsModel from '../model/recordsModel.js';
import { ErrorHandler } from '../utils/error.js';

export const diseaseDetails = async (req, res) => {
    console.log(req.body, "req from post api ");
    try {
        const { user_id,diseasePrediction,diseaseConfidence } = req.body;
        // Check if image and diseaseName are provided
        if ( !user_id || !diseasePrediction || !diseaseConfidence) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // Create a new record with image and diseaseName
        const newRecord = new recordsModel({
            user: user_id,
            diseasePrediction,
            diseaseConfidence
        });

        // Save the record to the database
        const savedRecord = await newRecord.save();

        return res.status(201).json({
            success: true,
            message: "Record saved successfully",
            data: savedRecord
        });
    } catch (error) {
       return res.status(500).json({
            message: error.message
        })

    }
};


export const fetchUserData = async(req,res) => {
    try {
        const {user_id} = req.body
        const userData = await recordsModel.findById(user_id);

        if(!userData) throw new ErrorHandler(400, "No record found")
        
            return res.status(200).json({
                data: userData
            })
    } catch (error) {
        console.log(error)
 
    }
}


export const fetchDiseaseData = async(req,res) => {
    try {
        const user_id = req.params.id 
        const diseaseData = await recordsModel.find({
            user: user_id
        }).exec();
        if(diseaseData){
        return res.status(200).json({
            data: diseaseData
        })
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: error.message 
        })
    }
}