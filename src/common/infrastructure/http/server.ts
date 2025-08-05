import { env } from '../env'
import { dataSource } from '../typeorm'
import { app } from './app'

dataSource
  .initialize()
  .then(() => {
    app.listen(env.PORT, () =>
      console.log(`Server is running in port ${env.PORT}`),
    )
  })
  .catch(err => {
    console.error(err)
  })
