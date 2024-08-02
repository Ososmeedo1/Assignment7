import { Router } from "express";
import { addCar, availableCars, deleteCar, getAllCars, getCarByModel, getSpecificCar, rentedCars, updateCar } from "./controllers/car.js";


const router = Router()


router.post('/add', addCar)
router.get('/:id', getSpecificCar)
router.get('/', getAllCars)
router.put('/update/:id', updateCar)
router.delete('/delete/:id', deleteCar)
router.get('/model/:model', getCarByModel)
router.get('/:status/:model', availableCars)
router.get('/status/:status', rentedCars)

export default router