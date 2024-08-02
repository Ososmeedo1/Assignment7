import bcrypt from 'bcrypt'
import { db } from '../../../../database/connection.js'
import { ObjectId } from 'bson'

export const signUp = async (req, res) => {


  const { password, email } = req.body

  const customerExist = await db.collection('customers').findOne({ email })

  if (customerExist) {
    return res.status(400).json({ message: "Email already exists" })
  }

  const hashPassword = bcrypt.hashSync(password, 8)
  req.body.password = hashPassword;
  const customer = await db.collection('customers').insertOne(req.body)

  return res.status(201).json({ message: "Done" })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const customerExist = await db.collection('customers').findOne({ email })

  if (customerExist) {
    const match = bcrypt.compareSync(password, customerExist.password)
    if (match) {
      return res.status(200).json({ message: "Done" })
    }
    return res.status(404).json({ message: "Invalid Email or Password" })
  }
  return res.status(404).json({ message: "Invalid Email or Password" })

}


export const getSpecificCustomer = async (req, res) => {
  const { id } = req.params


  const customerExist = await db.collection('customers').findOne({ _id: new ObjectId(`${id}`) }, { projection: { password: 0 } })


  if (customerExist) {
    return res.status(200).json({ message: "Done", customer: customerExist })
  }

  return res.status(404).json({ message: "Not Found" })
}

export const getAllCustomers = async (req, res) => {
  const customers = await db.collection('customers').find({}, { projection: { password: 0 } }).toArray()
  return res.status(200).json({ message: "Done", customers })
}


export const updateCustomer = async (req, res) => {
  const { id } = req.params;

  const customerExists = await db.collection('customers').findOne({ _id: new ObjectId(`${id}`) })
  

  if (customerExists) {
    const customers = await db.collection('customers').updateOne({ _id: new ObjectId(`${id}`) }, {$set: req.body})
    return res.status(200).json({messgae: "Done"})
  }

  return res.status(404).json({message: "Not Found"})

}


export const deleteCustomer = async (req, res) => {
  const {id} = req.params

  const customer = await db.collection('customers').deleteOne({_id: new ObjectId(`${id}`)})

  return res.status(200).json({message: "Done"})
}