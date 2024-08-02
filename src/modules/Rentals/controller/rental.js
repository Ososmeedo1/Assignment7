import { ObjectId } from "mongodb"
import { db } from "../../../../database/connection.js"


export const createRental = async (req, res) => {

  const { rentalDate, returnDate } = req.body;

  const customer = await db.collection('customers').findOne({ _id: new ObjectId(`${req.body.customerId}`) })
  const car = await db.collection('cars').findOne({ _id: new ObjectId(`${req.body.carId}`) })

  if (!car) {
    return res.status(404).json({ message: "Car not found" })
  }

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" })
  }

  if (car.status == 'rented') {
    return res.status(400).json({ message: "Car is already rented" })
  }

  const rentalDateObj = new Date(rentalDate);
  const returnDateObj = new Date(returnDate);

  if (isNaN(rentalDateObj || isNaN(returnDateObj))) {
    return res.status(400).json({ message: "Invalid rentalDate or returnDate" })
  }

  req.body.rentalDate = rentalDateObj;
  req.body.returnDate = returnDateObj;

  const rental = await db.collection('rentals').insertOne(req.body)

  await db.collection('cars').updateOne({ _id: new ObjectId(`${req.body.carId}`) }, { $set: { status: "rented" } })

  return res.status(201).json({ message: "Done" })

}


export const updateRental = async (req, res) => {

  console.log(req.body);
  const { id } = req.params;

  const {rentalDate, returnDate} = req.body

  const rentalExists = await db.collection('rentals').findOne({ _id: new ObjectId(`${id}`) })

  if (rentalExists) {
    const rentalDateObj = new Date(rentalDate);
    const returnDateObj = new Date(returnDate);

    if (isNaN(rentalDateObj || isNaN(returnDateObj))) {
      return res.status(400).json({ message: "Invalid rentalDate or returnDate" })
    }

    req.body.rentalDate = rentalDateObj;
    req.body.returnDate = returnDateObj;


    await db.collection('rentals').updateOne({_id: new ObjectId(`${id}`)}, {$set: req.body});

    return res.status(200).json({message: "Done"})
  }

  return res.status(404).json({message: "Not Found"})
}

export const deleteRental = async (req, res) => {

  const {id} = req.params;

  const selectedRental = await db.collection('rentals').findOne({_id: new ObjectId(`${id}`)})



  

  const car = await db.collection('cars').updateOne({_id: new ObjectId(`${selectedRental.carId}`)}, {$set: {status: "available"}})

  const rental = await db.collection('rentals').deleteOne({_id: new ObjectId(`${id}`)})

  return res.status(200).json({message: "Done"})
}


export const getAllRentals = async (req, res) => {

  const rentals = await db.collection('rentals').find().toArray()

  return res.status(200).json({message: "Done", rentals})
}

export const getSpecificRental = async (req, res) => {

  const {id} = req.params;

  const rental = await db.collection('rentals').findOne({_id: new ObjectId(`${id}`)})

  if (rental) {
    return res.status(200).json({message: "Done", rental})
  }

  return res.status(404).json({message: "Not found"})
}




