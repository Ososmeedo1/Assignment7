import { Router } from "express";
import { createRental, deleteRental, getAllRentals, getSpecificRental, updateRental } from "./controller/rental.js";

const router = Router();


router.post('/create', createRental)
router.put('/update/:id', updateRental)
router.delete('/delete/:id', deleteRental)
router.get('/', getAllRentals)
router.get('/:id', getSpecificRental)

export default router