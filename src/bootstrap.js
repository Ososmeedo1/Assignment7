import carRouter from "./modules/Cars/car.routes.js"
import customerRouter from "./modules/Customers/customer.routes.js"
import rentalRouter from "./modules/Rentals/rental.routes.js"



const bootstrap = (app, express) => {
  app.use(express.json())
  app.use('/customers', customerRouter)
  app.use('/cars', carRouter)
  app.use('/rentals', rentalRouter)
  app.use('*', (req, res) => {
    return res.json({message: "Not Found"})
  })
}

export default bootstrap