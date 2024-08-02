import { Router } from "express";
import { deleteCustomer, getAllCustomers, getSpecificCustomer, signIn, signUp, updateCustomer } from "./controller/customer.js";


const router = Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/:id', getSpecificCustomer)
router.get('/', getAllCustomers)
router.put('/update/:id', updateCustomer)
router.delete('/delete/:id', deleteCustomer)

export default router