import { ObjectId } from "mongodb"
import { db } from "../../../../database/connection.js"


export const addCar = async (req, res) => {

  const car = await db.collection('cars').insertOne(req.body)

  return res.status(201).json({ message: "Done", car })
}

export const getSpecificCar = async (req, res) => {

  const { id } = req.params;

  const car = await db.collection('cars').findOne({ _id: new ObjectId(`${id}`) })

  return res.status(200).json({ message: "Done", car })
}


export const getAllCars = async (req, res) => {
  const cars = await db.collection('cars').find().toArray()

  return res.status(200).json({ message: "Done", cars })

}

export const updateCar = async (req, res) => {
  const { id } = req.params;

  const carExists = await db.collection('cars').findOne({ _id: new ObjectId(`${id}`) })

  if (carExists) {
    const car = await db.collection('cars').updateOne({ _id: new ObjectId(`${id}`) }, { $set: req.body })
    return res.status(200).json({ message: "Done", car })
  }

  return res.status(404).json({ message: "Not found" })
}

export const deleteCar = async (req, res) => {
  const { id } = req.params;

  const carExists = await db.collection('cars').findOne({ _id: new ObjectId(`${id}`) })

  if (carExists) {
    const car = await db.collection('cars').deleteOne({ _id: new ObjectId(`${id}`) })
    return res.status(200).json({ message: "Done" })
  }

  return res.status(404).json({ message: "Not found" })
}

export const getCarByModel = async (req, res) => {
  const { model } = req.params;


  const cars = await db.collection('cars').find({ model }).toArray()

  return res.status(200).json({ message: "Done", cars })

}

export const availableCars = async (req, res) => {

  const { status, model } = req.params

  const cars = await db.collection('cars').find({ status, model }).toArray();

  return res.status(200).json({ message: "Done", cars })

}

export const rentedCars = async (req, res) => {

  const { status } = req.params

  console.log(status);

  const cars = await db.collection('cars').find({ status }).toArray();

  return res.status(200).json({ message: "Done", cars })

}




